const router = require('express').Router();
const user = require('../../database/schema/User');
const middleWare = require('../../middle/value');
const fs = require('fs');
const controller = require('./picture_controller');

router.route('/picture/add').post(middleWare.controllercheck_token, (req, res) => { // 사진 추가
    let token = req.body.token;
    user.findOne({ 'uuid': token })
        .then((f_user) => {
            let time = controller.getTime();
            if (f_user.images.hasOwnProperty(time)) {
                console.log('추가 이미지');
                let array = f_user.images[time];
                array.push(token + '_' + req.files.photo.name)
                f_user.images[time] = array;
            } else {
                console.log('그날의 처음 이미지');
                let array = f_user.images;
                array[time] = [token + '_' + req.files.photo.name]
                f_user.images = array;
            }

            user.update({ 'uuid': token }, { $set: { 'images': f_user.images } }, () => {
                fs.writeFile(token + '_' + req.files.photo.name, req.files.photo.data, () => {
                    res.status(200).end();
                })
            })
        })
});

router.route('/picture/view').post(middleWare.check_token, (req, res) => {

});



module.exports = router;