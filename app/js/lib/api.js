var savePath = function (name, data) {
    return fetch('/saveObject/' + name, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
}

var drawObject = function (name) {
    return fetch('/drawObject/' + name, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(obj.text())
    .then((response) => {
        console.log('rea', response);
    })
}

module.exports.savePath = savePath;
