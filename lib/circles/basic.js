var Entity = require('../entity');
var util = require('../util');

var Circle = function (x, y, r, segments) {
     Entity.call(this, x, y);
    // console.log(Entity);
    this.r = r;
    this.first = true;
    this.last = false;
    this.segments = segments || 10;
    this.currentIndex = 0;
    this.angle = Math.floor(360/this.segments);
}
Circle.prototype = Object.assign({}, Entity.prototype);
Circle.prototype.getNext = function() {
    var codes = [];
    if (this.currentIndex > this.segments) {
        if (this.last) {
            return false;
        } else { 
            this.last = true
            codes.push(this.up);
        }
    }
    if (this.first) {
        codes.push(this.up);
    }
    var point = {
      x: this.x +  Math.floor(((Math.sin((this.angle * this.currentIndex) * (Math.PI / 180)) * this.r)) * 100) /100 ,
      y: this.y + Math.floor(((Math.cos((this.angle * this.currentIndex) * (Math.PI / 180)) * this.r)) * 100) / 100
    }
    codes.push(util.fromPoint(point));
    if (this.first) {
        codes.push(this.down);
        this.first = false;
    }
    this.currentIndex++;


    return codes;
}
module.exports = Circle;
