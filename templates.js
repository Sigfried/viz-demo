(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "    Visualization:<br/>\n"
    + ((stack1 = this.invokePartial(partials.viz_desc,(depth0 != null ? depth0.viz : depth0),{"name":"viz_desc","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "    Visualization list:<br/>\n"
    + ((stack1 = this.invokePartial(partials.viz_list,(depth0 != null ? depth0.vizList : depth0),{"name":"viz_list","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<a href=\"viz_list\">List visualization demos</a>\n\n"
    + this.escapeExpression(((helper = (helper = helpers.wholequery || (depth0 != null ? depth0.wholequery : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"wholequery","hash":{},"data":data}) : helper)))
    + "\n<hr/>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.query : depth0)) != null ? stack1.viz : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "<hr/>\n<div id=\"datasets\"></div>\n<hr/>\n<div id=\"transforms\"></div>\n";
},"usePartial":true,"useData":true});
templates['main'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!DOCTYPE html>\n<html>\n<head>\n    <meta name=\"license\" content=\"http://sigfried.mit-license.org/\"/>\n    <meta charset=\"utf-8\">\n    <title>Demo Data Swap</title>\n</head>\n<body>\n\n    "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    <script src=\"bundle.js\"></script>\n    <script src=\"templates.js\"></script>\n    <script src=\"demoviz.js\"></script>\n</body>\n</html>\n";
},"useData":true});
templates['data_desc'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n\n<div>\n    "
    + alias3(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"file","hash":{},"data":data}) : helper)))
    + "<br/>\n    Source: <a href=\""
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"source","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"source","hash":{},"data":data}) : helper)))
    + "</a> <br/>\n    "
    + alias3(((helper = (helper = helpers.sourceDescription || (depth0 != null ? depth0.sourceDescription : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sourceDescription","hash":{},"data":data}) : helper)))
    + "\n    Sample: <pre>"
    + alias3(((helper = (helper = helpers.sample || (depth0 != null ? depth0.sample : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sample","hash":{},"data":data}) : helper)))
    + "</pre>\n</div>\n";
},"useData":true});
templates['data_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <li id=\""
    + alias3(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"file","hash":{},"data":data}) : helper)))
    + "\" class=\"data-desc\">\n        <input type=\"checkbox\" value=\""
    + alias3(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"file","hash":{},"data":data}) : helper)))
    + "\" />\n"
    + ((stack1 = this.invokePartial(partials.data_desc,depth0,{"name":"data_desc","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "    </li>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    got nothing\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<button onclick='loadData()'>Load Data</button>\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});
templates['transform_desc'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "Works with "
    + this.escapeExpression(((helper = (helper = helpers.viz || (depth0 != null ? depth0.viz : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"viz","hash":{},"data":data}) : helper)))
    + "<br/>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n\n<div>\n    <button onclick=\"loadTransform('"
    + alias3(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"file","hash":{},"data":data}) : helper)))
    + "','"
    + alias3(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "')\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</button> <br/>\n    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.viz : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    "
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n</div>\n";
},"useData":true});
templates['transform_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <li id=\""
    + this.escapeExpression(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"file","hash":{},"data":data}) : helper)))
    + "\" class=\"transform-desc\">\n"
    + ((stack1 = this.invokePartial(partials.transform_desc,depth0,{"name":"transform_desc","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "    </li>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    got nothing\n";
},"5":function(depth0,helpers,partials,data) {
    return "<button onclick=\"runDemo()\">Run Demo</button>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<h5>Load transform code if you like, or start from scratch</h5>\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.transformList : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n<button onclick=\"transform()\">Transform Data</button> \n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.vizChosen : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n<br/>\n<textarea rows=\"15\" cols=\"150\" id=\"transform-code\" style=\"border:1px solid black\">\n</textarea>\n<pre id=\"output\"></pre>\n";
},"usePartial":true,"useData":true});
templates['viz_desc'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n\n<a href=\"?viz="
    + alias3(((helper = (helper = helpers.dir || (depth0 != null ? depth0.dir : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dir","hash":{},"data":data}) : helper)))
    + "\">\n    <img src=\""
    + alias3(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" width=\"80px\" height=\"80px\"/ style=\"float:left\">\n</a>\n<div style=\"float:left\">\n"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"author","hash":{},"data":data}) : helper)))
    + " <br/>\nSource: <a href=\""
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"source","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"source","hash":{},"data":data}) : helper)))
    + "</a> <br/>\nData expected: "
    + alias3(((helper = (helper = helpers.dataExpected || (depth0 != null ? depth0.dataExpected : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dataExpected","hash":{},"data":data}) : helper)))
    + "\n</div>\n<div style=\"clear:both\"/>\n\n\n";
},"useData":true});
templates['viz_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <li>\n"
    + ((stack1 = this.invokePartial(partials.viz_desc,depth0,{"name":"viz_desc","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "    </li>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    got nothing\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});
templates['viz_list'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <li>\n"
    + ((stack1 = this.invokePartial(partials.viz_desc,depth0,{"name":"viz_desc","data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "    </li>\n";
},"3":function(depth0,helpers,partials,data) {
    return "    got nothing\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.vizes : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});
})();
