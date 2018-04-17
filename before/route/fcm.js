const FCM = require('fcm-node');
let serverKey = require('../serverKey.json');

exports.fcmSend = (data, place) => {
    let fcm = new FCM(serverKey.key1);
    sendFcm(fcm, getObject(data));
};

function getObject(data) {
    return {
        to: data.token,
        notification: {
            title: '숨겨왔던 사진이 나왔습니다!',
            body: '친구들과 함께 공유하세요!'
        }
    }
}

function sendFcm(fcm, model) {
    fcm.send(model, (err, response) => {
        err ? console.log('error = ' + err) : console.log(response);
    });
}