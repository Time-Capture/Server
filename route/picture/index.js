const router = require('express').Router();
const user = require('../../database/schema/User');
const middleWare = require('../../middle/value');
const fs = require('fs');
const T = require('../time');
const controller = require('./picture_controller');

router.route('/picture/add').post(middleWare.check_token, (req, res) => { // 사진 추가
    let token = req.body.token || req.session.key;
    let friend = req.body.friend;
    user.findOne({ 'uuid': token })
        .then((f_user) => {
            let time = T.getTimeStamp();
            if (f_user.images.hasOwnProperty(time)) {
                console.log('추가 이미지');
                let array = f_user.images[time];
                array.push({ 'img': token + '_' + req.files.photo.name, 'friend': [friend] });
                f_user.images[time] = array;
            } else {
                console.log('그날의 처음 이미지');
                let array = f_user.images;
                array[time] = [{ 'img': token + '_' + req.files.photo.name, 'friend': [friend] }];
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
    let token = req.body.token || req.session.key;
    user.findOne({ 'uuid': token })
        .then((f_user) => {
            let date = controller.strDate(f_user.endTime);
            console.log(date);
            if (date) {
                let arr = new Array();
                for (let i in f_user.images) {
                    arr.push(f_user.images[i]);
                    if (i == date) {
                        res.status(200).json({ 'view': arr });
                    }
                }
            } else {
                let imageCount = 0;
                for (let i in f_user.images) {
                    for (let j = 0; j < f_user.images[i].length; j++) {
                        imageCount++;
                    }
                }
                let friendCount = 0;
                for (let i in f_user.images) {
                    for (let j = 0; j < f_user.images[i].length; j++) {
                        for (let z = 0; z < f_user.images[i][j].friend.length; z++) {
                            console.log(f_user.images[i][j].friend[z]);
                            friendCount++;
                        }
                    }

                }
                res.status(403).json({ 'friend': friendCount, 'image': imageCount }).end();
            }
        });
});



module.exports = router;