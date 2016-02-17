var fs = require('fs');
var fromPoint = function (point) {
    return 'G0 X' + point.x + ' Y' + point.y
}

var simplify = function (points, threshold) {
    threshold = 1 * threshold;
    return points.reduce((prev, current, index, array) => {
        if (typeof prev[prev.length - 1] !== 'undefined') {
            if (prev[prev.length - 1].x > current.x + threshold ||
                prev[prev.length - 1].x < current.x - threshold) {
                prev.push(current);
            } else if (prev[prev.length - 1].y > current.y + threshold ||
                prev[prev.length - 1].y < current.y - threshold) {
                prev.push(current);
            }
        } else {
            prev.push(current);
        }
        return prev;
    }, [])
}

module.exports.save = function (name, paths) {
    paths = paths.map((path) => {
        return simplify(path, 0.6);
    })
    var doc = {
        gcode: paths.map((path) => {
            return path.map((point) => {
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
module.exports.simplify = simplify;
