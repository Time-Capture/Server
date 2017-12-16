const date = new Date();

exports.getTime = () => {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
}

function getTime() {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
}

exports.strDate = (d1) => {
    console.log(d1);
    let data = JSON.parse(d1);
    for (let i in data) {
        console.log(data);
        let start_Array = new Date(i);
        let end_Array = new Date(getTime());
        if (start_Array >= end_Array) {
            return start_Array;
        }
    }
    return null;

}