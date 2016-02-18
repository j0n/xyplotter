var fs = require('fs');
var fromPoint = function (point) {
    return 'G0 X' + point.x + ' Y' + point.y
}

var mCode = function (value) {
  return 'M1 ' + value;
}

var flatten = function (item) {
    return {
        x: Math.round(item.x * 100) / 100,
        y: Math.round(item.y * 100) / 100
    }
}

var simplify = function (points, threshold) {
    threshold = 1 * threshold;
    nextPointY = false
    nextPointX = false
    return points
        .map(flatten)
        .reduce((prev, current, index, array) => {
            if (typeof prev[prev.length - 1] !== 'undefined') {
                if (prev[prev.length - 1].x > current.x + threshold ||
                    prev[prev.length - 1].x < current.x - threshold) {
                    prev.push(current);
                } else if (prev[prev.length - 1].y > current.y + threshold ||
                    prev[prev.length - 1].y < current.y - threshold) {
                    prev.push(current);
                } else if (array.length === index + 1) {
                    prev.push(current);
                }
                 
            } else {
                prev.push(current);
            }
            return prev;
        }, [])
        .reduce(cleanUp, []);
}
var nextPointY = false
var nextPointX = false

var cleanUp = (prev, current, index, array) => {

    if (typeof prev[prev.length - 1] !== 'undefined') {
        var previousItem = prev[prev.length - 1];
        if (current.x === previousItem.x) {
            nextPointY = current
            // line add y to next
        }
        else if (nextPointY) {
            prev.push(nextPointY);
            nextPointY = false;
        } 
        if (current.y === previousItem.y) {
            nextPointX = current
        }
        else if (nextPointX) {
            prev.push(nextPointX);
            nextPointX = false;
        }
        if (current.x !== previousItem.x &&
            current.y !== previousItem.y || 
            array.length === index + 1) {
            prev.push(current);
        }
    } else {
        prev.push(current);
    }
    return prev
}


var scale = function (factor, points) {
    return points.map((item) => {
        return {
            x: Math.round(item.x * factor * 10) / 10,
            y: Math.round(item.y * factor * 10) / 10
        }
    })

}

module.exports.save = function (name, paths, threshold) {
    paths = paths.map((path) => {
        return simplify(path, threshold || 0);
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

module.exports.load = function (name) {
    return JSON.parse(fs.readFileSync('./store/' + name + '.json', 'utf8'));
}

module.exports.fromPoint = fromPoint;
module.exports.simplify = simplify;
module.exports.scale = scale;
module.exports.mCode = mCode;
