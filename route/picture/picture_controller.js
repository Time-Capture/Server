const date = new Date();

exports.getTime = () => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
}

function getTime() {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
}

exports.strDate = (d1) => {
    let data = JSON.parse(d1);
    for (let i in data) {
        let start_Array = new Date(i.split("-"));
        let end_Array = new Date(getTime().split("-"));
        if (start_Array >= end_Array) {
            return start_Array;
        }
    }

}