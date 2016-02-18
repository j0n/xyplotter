const api = require('./api');
const svg = require('./svg');
const EventEmitter = require('events');

var getAsText = function (file) {
    return new Promise((resolve, reject) => {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            resolve(event.target.result);
        }
        fileReader.onerror = function (error) {
            reject(error);
        }
        fileReader.readAsText(file)
    })
}
module.exports.setup = function (el) {
    const emitter = new EventEmitter();
    el.addEventListener('change', function (event) {
        if (this.files.length === 0) {
            return false
        }
        getAsText(this.files[0])
            .then((result) => {
                return api.savePath(
                    this.files[0].name,
                    svg.getPath(result)
                )
            })
            .then((data) => {
                emitter.emit('uploaded', data);
            })
            .catch((err) => {
                emitter.emit('error', err);
            })
    })
    return emitter;
}

