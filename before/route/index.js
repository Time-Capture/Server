const route = require('express').Router();
const user = require('./user/index');
const picture = require('./picture/index');

route.use('/api', user, picture);

module.exports = route;