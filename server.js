var express = require('express');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var _ = require('lodash');

var app = express();
app.use('/', express.static('.'));
app.use('/viz_transforms', express.static('viz_transforms'));

var hbs = exphbs.create({
    helpers: {
        loadText: loadText,
    },
    defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    var context = {};
    context.wholequery = JSON.stringify(req.query);
    context.query = req.query;
    if (req.query.viz) {
        context.viz = getVizList(req.query.viz)[0];
    } else {
        context.vizList = getVizList();
    }
    /*
    if (req.query.dataset) {
        context.dataset = getVizList(req.query.dataset)[0];
    } else {
        context.datasetList = getDatasetList();
    }
    */
    //console.log(context);
    res.render('home', context);
});
app.get('/viz_list', function (req, res) {
    res.render('viz_list', getVizList(req.query.viz));
});
app.get('/viz_list_configs', function (req, res) {
    res.send(getVizList(req.query.viz));
});
function getVizList(viz) {
    var vizDirs = viz ? [viz] : fs.readdirSync('viz_content');
    return _.map(vizDirs, function(vizDir) {
        var config = getJson('viz_content/' + vizDir + '/config.json');
        config.dir = vizDir;
        return config;
    });
};
/*
function getDatasetList(filename) {
    var list = getJson('data/list.json');
    if (filename) {
        list = _.where(list, {file:filename});
    }
    _.each(list, function(dataset) {
        var c = fs.readFileSync('data/' + dataset.file, {encoding:'utf8'});
        dataset.sample = c.substr(0,1000);
    });
    return list;
};
*/
function getJson(path) {
    var c = fs.readFileSync(path, {encoding:'utf8'});
    var json = JSON.parse(c);
    return json;
}

function loadText(fname) {
    return fs.readFileSync(fname, {encoding:'utf8'});
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
});
