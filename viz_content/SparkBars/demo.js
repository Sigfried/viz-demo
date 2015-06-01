function displayContents(data) {
    var fields = _.keys(data[0]);
    var sp = sparkBars(data, 600, 50);
    d3.select('body').append('div')
        .data(fields)
        .enter().append('div')
            //.style('float','left')
        .call(sp);

    //var element = document.getElementById('file-content');
    //element.innerHTML = contents;
}
function sparkBars(sourceData, width, height) {
    function sp(selection) {
        selection.each(function(field) {
            console.log('sparkBar', field);
            var vals = _.supergroup(sourceData, field);
            d3.select(this)
                //.style('width', width + 'px')
                //.style('height', height + 'px')
                .append('h3').text(field)
            var counts = _.map(vals, function(val) { 
                return val.records.length;
            });
            sparkBar(d3.select(this), counts, width, height, 'blue');
        });
        return sp;
    }
    return sp;
}
function sparkBar(node, arr, width, height, color) {
    var x = d3.scale.linear()
            .domain([0, arr.length])
            .range([0, width]);
    var y = d3.scale.linear()
            .domain([0, d3.max(arr)])
            .range([0, height]);
    var barWidth = width / arr.length;
    var svg = node.append('svg')
        .attr('width', width)
        .attr('height', height);
    svg.append('rect')
        .attr('fill', '#DDA')
        .attr('width', width)
        .attr('height', height);

    var bars = svg.selectAll('rect.bar')
                    .data(arr);
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('fill', color)
        .attr('x', function(d,i) { return x(i) })
        .attr('y', function(d) { return height - y(d) })
        .attr('height', function(d) { return y(d) })
        .attr('width', barWidth)
    return svg;
}
