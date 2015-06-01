
Handlebars.partials = Handlebars.templates;

content.query = queryString();
content.vizChosen = content.query.viz;
d3.json("/viz_list_configs", function(json) {
    content.vizLists = json;
});

d3.select('#datasets')
    .html(Handlebars.templates.data_list(content.dataList))
d3.select('#transforms')
    .html(Handlebars.templates.transform_list(content))


var loadedData = [];
function loadData() {
    loadedData = [];
    d3.selectAll('li.data-desc>input')
        .each(function() {
            if (this.checked) {
                var desc = this.parentNode;
                var fname = desc.id;
                var extension = fname.match(/\.([^.]+)$/)[1];
                if (extension === 'csv') {
                    d3.csv('/data/'+fname, function(data) {
                        loadedData.push(data);
                    });
                } else if (extension === 'json') {
                    d3.json('/data/'+fname, function(data) {
                        loadedData.push(data);
                    });
                }
            } else {
                d3.select(this.parentNode).remove();
            }
        })
};

d3.selectAll('li.data-desc')
    .each(function() {
        var desc = this;
        var fname = desc.id;
        var extension = fname.match(/\.([^.]+)$/)[1];
        if (extension === 'csv') {
            d3.csv('/data/'+fname, function(data) {
                d3.select(desc).select('pre')
                    .text(d3.csv.format(data.slice(0,3)))
            });
        } else if (extension === 'json') {
            d3.json('/data/'+fname, function(data) {
                d3.select(desc).select('pre')
                    .text(data.slice(0,3))
            });
        }
        //var config = _.find(content.dataList, {file:dd.id});
    });
function loadTransform(file, code) {
    if (code)
        d3.select("#transform-code").text(code);
    else
        d3.xhr('/viz_transforms/' + file, function(err, data) {
            d3.select("#transform-code").text(data.response);
        });
}
function transform() {
    var code = d3.select("#transform-code").node().value;
    var trans;
    eval('trans = ' + code);
    var out = trans.apply(null, loadedData);
    d3.select("#output").text(JSON.stringify(out,null,2));
    window.data = out;
}
function runDemo() {
    var demoUrl = "/viz_content/" + content.vizChosen
            + '/' +
            _.find(content.vizLists,{dir:content.vizChosen})
            .index;
    var wnd = window.open(demoUrl, "Viz Demo Output", "_blank");
    //wnd.document.write('<html><body><script>alert("hi")</script>hello</body></html>');
    var qs = queryString();
    /*
    var url = '/viz_content/' + qs.viz + '/runDemo' +
        '?replace=jsonfile&with=worldhealth.csv
        &transform=_.chain(data.slice(0,10)).                          map(function(d)%20{%20return%20_.chain(d).pairs().filter(function(p,i)%20{return%20%20i%20%3C%2010%20%26%26%20p[0].match(/^\d\d\d\d$/)}).map(function(p){return%20{x:       parseInt(p[0]),y:parseFloat(p[1])}}).value()%20}).value()
    var a = document.createElement('a');
    */
}


//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function parseQS(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {
          var p=a[i].split('=', 2);
          if (p.length == 1)
              b[p[0]] = "";
          else
              b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
}
function queryString() {
  return parseQS(window.location.search.substr(1).split('&'));
}
