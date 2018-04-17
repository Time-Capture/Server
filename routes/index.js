const express = require('express');
let router = express.router;

let auth = require('./auth');

router.use('/', auth);

module.exports = router;