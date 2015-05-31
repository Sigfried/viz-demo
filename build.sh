find views|grep handlebars|xargs handlebars > templates.js
browserify bundledMods.js -o bundle.js
