var fs = require('fs');
var fromPoint = function (point) {
    return 'G0 X' + point.x + ' Y' + point.y
}

var simplify = function () {
}

module.exports.save = function (name, paths) {
    console.log('paths', paths.length);
    var doc = {
        gcode: paths.map((path) => {
            return path.map((point) => {
                console.log('point', point);
                return fromPoint(point);
            })
        }),
        paths: paths
    }
    return fs.writeFile(
            './store/' + name + '.json',
            JSON.stringify(doc, null, 4),
            'utf8');

}
module.exports.fromPoint = fromPoint;
