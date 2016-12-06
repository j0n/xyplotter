var util = require('./util');
var Path = function (x, y, paths) {
    this.x = x;
    this.y = y;
    this.id = Math.round(Math.random() * 1000)
    this.paths = [].concat(paths);
    this.points = [];
    this.finished = false;
    this.newPath = true;
    this.currentPath = false;
    this.wait = false;
    this.forceDown = false;
}
Path.prototype.setDown = function (value) {
    this.down = 'M1 ' + value;
}
Path.prototype.setUp = function (value) {
    this.up = 'M1 ' + value;
}
Path.prototype.rotate = function (center, angle) {
    this.paths = this.paths.map((points) => {
        return points.map((point) => {
            var np = util.rotatePoint(
                {
                    x: 0,
                    y: 0
                },
                point,
                angle
            )
            return np;
        })
    })

}
Path.prototype.distortion = function () {
}

Path.prototype.getPoints = function () {
}
Path.prototype.getNext = function () {
    var codes = [];
  // console.log('this.wait', this.wait);
    if (this.paths.length === 0 &&
      this.points.length === 0 &&
        !this.finished) {

        this.finished = true
        if (this.wait) {
            codes.push('wait');
        }
        codes.push(this.up)
        if (this.wait) {
            codes.push('wait');
        }

        return codes
    }
    if (this.paths.length === 0 &&
        this.points.length === 0 &&
        this.finished) {

        return false
    }

    if (this.points.length === 0) {
        this.points = this.paths.shift();
        this.newPath = true
        if (this.wait) {
            codes.push('wait');
        }
        if (this.forceDown !== true) {
            codes.push(this.up);
        }
        if (this.wait) {
            codes.push('wait');
        }
    }
    if (this.points.length > 0) {
        var point = this.points.shift();
        codes.push(util.fromPoint({
            x: this.x + point.x,
            y: this.y + point.y
        }));
        if (this.newPath) {
            this.newPath = false;
            if (this.wait) {
                codes.push('wait');
            }
            if (this.forceDown !== true) {
                codes.push(this.down);
            }
            if (this.wait) {
                codes.push('wait');
            }
        }
    }
    return codes;
}

module.exports = Path;
