module.exports.getAsText = function (file) {
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
