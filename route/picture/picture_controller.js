const date = new Date();


exports.saveImage = (f_user, uuid, photo) => {
    return new Promise((resolve, reject) => {

    })
}

exports.getTime = () => {
    return date.getFullYear() + '년' + (date.getMonth() + 1) + '월' + date.getDay() + '일';
}