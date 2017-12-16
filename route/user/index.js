const router = require('express').Router();
const user = require('../../database/schema/User');
const uuid = require('uuid/v4');
const controller = require('./user_controller');
const middleWare = require('../../middle/value');

router.route('/signup').post(middleWare, (req, res) => {
    console.log('유저 회원가입');
    let id = req.body.id;
    let pw = req.body.password;
    let name = req.body.name;
    user.findOne({
            'id': id,
            'password': pw
        })
        .then((f_user) => {
            if (f_user) {
                res.status(400).json({
                    'msg': 'Not Accept Request'
                }).end();
            } else {
                let obj = new user({
                    'id': id,
                    'password': pw,
                    'name': name,
                    'uuid': uuid()
                });
                obj.save(() => {
                    console.log(id + 'DB Save');
                    res.status(200).end();
                });
            }
        });
});

router.route('/signin').post(middleWare, (req, res) => {
    console.log('유저 로그인');
    let id = req.body.id;
    let pw = req.body.password;
    user.findOne({ 'id': id, 'password': pw })
        .then((f_user) => {
            { f_user ? res.status(200).json({ 'token': f_user.uuid }).end() : res.status(400).end() }
        })
});

module.exports = router;