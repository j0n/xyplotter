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

module.exports.savePath = savePath;
