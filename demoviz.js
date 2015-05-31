
Handlebars.partials = Handlebars.templates;

d3.select('#datasets')
    .html(Handlebars.templates.data_list(content.dataList))
d3.select('#transforms')
    .html(Handlebars.templates.transform_list(content.transformList))

d3.select('#load-data')
    .on('click', function() {
        d3.selectAll('li.data-desc>input')
            .each(function() {
                if (!this.checked)
                    d3.select(this.parentNode).remove();
            })
    });

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
function loadTransform(file) {
    d3.xhr('/viz_transforms/' + file, function(err, data) {
        d3.select("#transform-code")
            .text(data.response);
    });
}
