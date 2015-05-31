
var fs = require('fs');
var _ = require('lodash');
require('supergroup');
var express    = require('express')
var serveIndex = require('serve-index')
//var serveStatic = require('serve-static')
var st = require('connect-static-transform');
var d3 = require('d3');
var vm = require('vm');
var url = require('url');

var app = express();

// handling 404 errors
app.use(function(err, req, res, next) {
    console.log(req.url);
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
            console.log(req.params);
            //console.log('Error', error);
            return next(error);
        }
        var blob = [{"a":1},{"a":2}];
        console.log('test supergroup',_.supergroup([{"a":1},{"a":2}], 'a').rawValues());
        if (req.query.transform) {
            console.log('SCRIPT', req.query.transform);
            //var script = vm.createScript(req.query.transform);
            if (req.params.file.match(/\.csv$/)) {
                var csv = d3.csv.parse(data);
                var sandbox = {blah: 1, data:csv, _:_, d3:d3 };
                //console.log(sandbox);
                //vm.createContext(sandbox);
                var result = vm.runInNewContext(req.query.transform, sandbox);
                //data = [1,2,3,4];
                //var sandbox = {"data":csv, result:'nothing'};
                //var sandbox = {"data":[1,2,3,4,5]};
                //script.runInNewContext(sandbox);
                //var result = sandbox.result;
                console.log('Result', result);
                res.send(result);
            }
        } else {
            res.send(data);
        }
    })
});

var staticfiles = express.static('viz_examples');

//app.use(toUpperCase);
app.get('/viz_examples/:file', function(req, res, next) {
    var pathname = url.parse(req.url).pathname.substr(1);
    console.log(pathname);
    var f = fs.readFile(pathname, 'utf8', function(err, data) {
        console.log(req.params.file, err);
        if (err) {
            var error = new Error();
            error.status = 404;
            console.log(url.parse(req.url));
            console.log('Error', error);
            return next(error);
        }
        //console.log(req.query.replace, '\n\n\n');
        //console.log(req.query.with);
        if (req.query.replace && req.query.with) {
            var dataUrl = '"/data/' + req.query.with;
            console.log(dataUrl);
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


// from http://expressjs.com/advanced/developing-template-engines.html
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});
app.set('views', './viz_examples'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
 
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
