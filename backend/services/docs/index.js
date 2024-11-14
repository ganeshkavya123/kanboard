
const basicInfo = require('./basic_info');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const home = require('./home');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...home
};