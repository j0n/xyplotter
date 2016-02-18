var util = require('./util');
var Path = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.startX = x;
  this.startY = x;
  this.width = width;
  this.height = height;
  this.id = Math.round(Math.random() * 1000);
  this.ySpacing = 10;
  this.xSpacing = 2;
  this.currentX = 0;
  this.currentY = 0;
  this.xLenght = 5;
  this.xDone = false;
  this.yDone = false;
  this.maxX = this.x + this.width;
}
Path.prototype.setDown = function(value) {
  this.down = 'M1 ' + value;
}
Path.prototype.setUp = function(value) {
  this.up = 'M1 ' + value;
}
Path.prototype.drawX = function () {
    codes.push(this.up);
    this.x += this.xSpacing;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.y
    }))
    codes.push(this.down);
    this.x = this.x + this.xLenght;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.y
    }))
    if (this.x > this.maxX) {
        this.xDone = true;
    }
    return codes;
}
Path.prototype.drawY = function () {
    codes.push(this.up);
    this.x += this.xSpacing;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.y
    }))
    codes.push(this.down);
    this.y = this.y + this.yLenght;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.y
    }))
    if (this.x > this.maxX) {
        this.xDone = true;
    }
    return codes;
}
Path.prototype.getNext = function() {
    var codes = [];
    if (!this.xDone) {
        return this.drawX()
    }
    return codes;
}

module.exports = Path;
