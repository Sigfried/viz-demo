
var fs = require('fs');
var _ = require('lodash');
require('supergroup');
var express    = require('express')
var serveIndex = require('serve-index')
//var serveStatic = require('serve-static')
var st = require('connect-static-transform');
var d3 = require('d3');
var vm = require('vm');

var app = express();

// handling 404 errors
app.use(function(err, req, res, next) {
    //console.log(err);
    if(err.status !== 404) {
        return next();
    }
    res.send(err.message || '404 Error. File not found');
});

app.get('/data/:file', function(req, res, next) {
    var f = fs.readFile('data/' + req.params.file, 'utf8', function(err, data) {
        if (err) {
            var error = new Error();
            error.status = 404;
            //console.log('Error', error);
            return next(error);
        }
        if (req.query.transform) {
            //var script = vm.createScript(req.query.transform);
            var script = vm.createScript('result=data[1]');
            console.log('SCRIPT', req.query.transform);
            if (req.params.file.match(/\.csv$/)) {
                var data = d3.csv.parse(data);
                //console.log('DATA', [1,2,3], data[0]);
                //data = [1,2,3,4];
                var sandbox = {"data":data};
                //var sandbox = {"data":[1,2,3,4,5]};
                script.runInNewContext(sandbox);
                data = sandbox.result;
            }
            console.log('DATA', data);
            data = JSON.stringify(data);
        }
        //console.log('DATA', data);
        res.send(data);
    })
});

var staticfiles = express.static('viz_examples');

//app.use(toUpperCase);
app.get('/viz_examples/:file', function(req, res, next) {
    var f = fs.readFile('viz_examples/' + req.params.file, 'utf8', function(err, data) {
        console.log(req.params.file, err);
        if (err) {
            var error = new Error();
            error.status = 404;
            console.log('Error', error);
            return next(error);
        }
        //console.log(req.query.replace);
        //console.log(req.query.with);
        if (req.query.replace && req.query.with) {
            var dataUrl = '"../data/' + req.query.with;
            if (req.query.transform) {
                dataUrl += ('?transform=' + encodeURIComponent(req.query.transform));
            }
            dataUrl += '"';

            var re = new RegExp('{{' + req.query.replace + '.*}}');
            data = data.replace(re, dataUrl);
        } else {
            var re = new RegExp('{{.*\\|\\|(.*)}}');
            //var re = new RegExp('\{\{.*\|\|(.*)\}\}');
            data = data.replace(re, '$1');
        }
        //console.log(data);
        res.send(data);
    });
    /*
    console.log('in get');
    console.log(_.keys(req));
    console.log('url', req.url);
    console.log('query',req.query);
    console.log('route', req.route);
    console.log('params',req.params);
    */
    
    //next(function(){console.log(arguments);});
    //staticfiles(req, res, function() {console.log('HERE',arguments)});
});

app.use('/viz_examples', serveIndex('viz_examples', {'icons': true}))

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});
 
app.listen(3000)

/*
app.use('/viz_examples', express.static('viz_examples'));
//app.use('/viz_examples', modify);
//app.use(serve);


function modify(req, res, next){
    console.log(_.keys(req));
    console.log(req.url);
    console.log(req.body);
    res.body = res.body + "modified";
    next();
}

app.use('/generate/:file', modify);

app.get('/generate/:file', function(req, res) {
    res.send('open ' + req.params.file);
});

*/
