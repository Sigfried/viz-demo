
_ = require('lodash');
require('supergroup'); // mixin: _.supergroup()
d3 = require('d3');
Handlebars = require('handlebars');

content = {};

content.dataList = require('./data/list.json');
content.transformList = require('./viz_transforms/list.json');
