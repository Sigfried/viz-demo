
Handlebars.partials = Handlebars.templates;

content.query = queryString();
content.vizChosen = content.query.viz;

d3.json("/viz_list_configs", function(json) {
    content.vizLists = json;
    if (content.vizChosen) {
        content.vizConfig = _.find(content.vizLists,{dir:content.vizChosen});
        if (content.vizConfig.vizParams) {
            d3.select("#vizparam-div")
                .append('p').text('Vis params');
            d3.select("#vizparam-div")
                .append("textarea")
                    .attr('rows', 3)
                    .attr('cols', 150)
                    .attr('id','vizparams')
                .text(content.vizConfig.vizParams)
        }
    }
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
            + '/' + content.vizConfig.index;
    /*
    var p = d3.select("#vizparams").node().value;
    if (p)
        window.vizParams = eval( 'window.vizParams = ' + p);
        */
    var wnd = window.open(demoUrl, "Viz Demo Output", "_blank");
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
