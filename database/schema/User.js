const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = mongoose.Schema({
    id: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    uuid: { type: String, require: true, unique: true },
    images: { type: JSON, default: '{}' }
})

module.exports = mongoose.model('User', user);