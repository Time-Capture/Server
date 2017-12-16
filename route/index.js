const route = require('express').Router();

const user = require('./user/index');

route.use('/api', user);

module.exports = route;