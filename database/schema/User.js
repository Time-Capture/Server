const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image = { "test": [{ 'img': '', 'friend': '' }] }

let user = mongoose.Schema({
    id: { type: String, unique: true, require: true },
    password: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    school: { type: String, require: true },
    uuid: { type: String, require: true, unique: true },
    endTime: { type: String, require: true },
    friend: { type: Array, default: [] },
    images: { type: JSON, require: true, default: image }
})

module.exports = mongoose.model('User', user);