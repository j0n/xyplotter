var util = require('./util');
var Pattern = require('./pattern');
var Path = require('./path');

var CirclePattern = function (pos, paths, r, amount) {
    Pattern.call(this, pos.x, pos.y);
    this.amount = amount;
    this.base = paths;
    this.r = r;
    this.angle = Math.floor(360/this.amount);
    this.setupPaths();
}
CirclePattern.prototype = Object.assign({}, Pattern.prototype);

CirclePattern.prototype.setupPaths = function() {
    this.paths = [];
    var radian = (Math.PI / 180);
    for (var i = 0; i < this.amount * 1; i++) {
        var angle = this.angle * i
        var x = this.x + (Math.sin(angle) * radian * this.r);
        var y = this.y + (Math.cos(angle) * radian * this.r);
        y = Math.floor(y * 100) / 100;
        x = Math.floor(x * 100) / 100;

        var point = {
          x: this.x +  Math.floor(((Math.sin((this.angle * i) * (Math.PI / 180)) * this.r)) * 100) /100 ,
          y: this.y + Math.floor(((Math.cos((this.angle * i) * (Math.PI / 180)) * this.r)) * 100) / 100
        }
        var path = new Path(point.x, point.y, this.base)
        path.rotate({
                    x: this.x,
                    y: this.y
                }, angle)
        this.paths.push(path);
    }
}
module.exports = CirclePattern;
