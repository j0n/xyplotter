var util = require('./util');
var Entity = require('./entity');
var Path = require('./path');
var Pattern = function (x, y, pathName, direction, amount, size, scale, wait) {
    Entity.call(this, x, y);
    this.size = size;
    this.scale = scale;
    this.direction = direction;
    this.amount = amount;
    this.pathName = pathName;
    this.paths = [];
    console.log('WAIT', wait)
    this.wait = wait === true;
    console.log('this.WAIT', this.wait)

    this.setupPaths();
}
Pattern.prototype = Object.assign({}, Entity.prototype);
Pattern.prototype.setupPaths = function() {
    for (var i = 0; i < this.amount * 1; i++) {
        var coords = util.load(this.pathName).paths.map((path) => {
            return util.scale(this.scale || 0.1, path)
        })
        var pathX = this.x + (this.direction === 'x' ? i * this.size : 0);
        var pathY = this.y + (this.direction === 'y' ? i * this.size : 0);
        var path = new Path(pathX, pathY, coords)
        path.wait = this.wait
        this.paths.push(path);
    }
}

Pattern.prototype.setDown = function (value) {
    this.paths.forEach((path) => {
        path.setDown(value);
    })
    this.down = 'M1 ' + value;
}
Pattern.prototype.setUp = function (value) {
    this.paths.forEach((path) => {
        path.setUp(value);
    })
    this.up = 'M1 ' + value;
}

Pattern.prototype.getNext = function () {
    if (this.paths.length > 0) {
      var nextCoords = this.paths[0].getNext()

      if (nextCoords === false) {
        this.paths.shift();
        return this.getNext();
      } else {
          return nextCoords;
      }
    } else {
        console.log('this.path.length', this.paths.length)
        return false;
    }
}

module.exports = Pattern;
