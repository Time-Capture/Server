const express = require('express');
const bodyparser = require('body-parser');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const db = require('./database/conn');
const route = require('./route');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static(__dirname + '/static'));

app.use(bodyparser.json());
app.use(fileUpload());

app.use('/', route);

app.listen(process.env.PORT || 9024, () => {
    db.conn();
    console.log('Server Port On 9024');
})