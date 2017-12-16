const mongoose = require('mongoose');

exports.conn = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://dayzen:kyera12589@ds159696.mlab.com:59696/appjam', { useMongoClient: true });
    mongoose.connection.on('connect', () => {
        console.log('CONNECTION DB');
    })
    mongoose.connection.on('disconnected', () => {
        console.log('DISCONNECTION DB');
    })
}