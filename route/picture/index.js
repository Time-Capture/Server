const router = require('express').Router();
const user = require('../../database/schema/User');
const middleWare = require('../../middle/value');
const fs = require('fs');
const controller = require('./picture_controller');

router.route('/picture/add').post(middleWare.check_token, (req, res) => { // 사진 추가
    let token = req.body.token;
    let friend = req.body.friend;
    user.findOne({ 'uuid': token })
        .then((f_user) => {
            let time = controller.getTime();
            if (f_user.images.hasOwnProperty(time)) {
                console.log('추가 이미지');
                let array = f_user.images[time];
                array.push({ 'img': token + '_' + req.files.photo.name, 'friend': friend });
                f_user.images[time] = array;
            } else {
                console.log('그날의 처음 이미지');
                let array = f_user.images;
                array[time] = [{ 'img': token + '_' + req.files.photo.name, 'friend': friend }];
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
    let token = req.body.token;
    user.findOne({ 'uuid': token })
        .then((f_user) => {
            let date = controller.strDate(f_user.images);
            if (date) {
                let arr = new Array();
                for (let i in f_user.images) {
                    console.log(i);
                    if (i == date) {

                    }
                }
            } else {
                let imageCount = 0;
                for (let i = 0; i < f_user.images.length; i++) {
                    for (let j = 0; j = f_user.images[i]; j++) {
                        imageCount++;
                    }
                }
                res.status(403).json({ 'friend': f_user.friend.length, 'image': imageCount }).end();
            }
        });
});



module.exports = router;