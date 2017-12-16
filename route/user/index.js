const router = require('express').Router();
const user = require('../../database/schema/User');
const uuid = require('uuid/v4');
const controller = require('./user_controller');
const middleWare = require('../../middle/value');

router.route('/').get((req, res) => {
    console.log('test');
    res.send('test').end();
})

router.route('/signup').post(middleWare.check_user, (req, res) => {
    console.log('유저 회원가입');
    let id = req.body.id;
    let pw = req.body.password;
    let name = req.body.name;
    let school = req.body.school;
    let endTime = req.body.endTime;

    user.findOne({
            'id': id,
            'password': pw,
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
                    'uuid': uuid(),
                    'school': school,
                    'endTime': endTime
                });
                obj.save(() => {
                    console.log(id + 'DB Save');
                    res.status(200).end();
                });
            }
        });
});

router.route('/signin').post(middleWare.check_user, (req, res) => {
    console.log('유저 로그인');
    let id = req.body.id;
    let pw = req.body.password;
    user.findOne({ 'id': id, 'password': pw })
        .then((f_user) => {
            if (f_user) {
                req.session.key = f_user.uuid;
                res.status(200).json({ 'token': f_user.uuid, 'name': f_user.name }).end()
            } else {
                res.status(400).end();
            }
        })
});

module.exports = router;