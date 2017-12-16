const T = require('../time');

exports.strDate = (endTime) => {
    let time = T.getTimeStamp();
    if (time >= endTime) {
        return time;
    }
    return null;
}