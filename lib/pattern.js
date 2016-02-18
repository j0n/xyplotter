var util = require('./util');
var Path = function (x, y, width, height) {
    this.width = width;
    this.height = height;
    this.id = Math.round(Math.random() * 1000);
    this.x = x;
    this.y = y;
    this.start = {
        x: x,
        y: y
    }
    this.spacing = {
        y: 10,
        x: 10
    }
    this.current = {
        x: 0,
        y: 0
    }
    this.done = {
        y: false,
        x: false
    }
    this.max = {
        x: this.x + this.width,
        y: this.y + this.height
    }
    this.xLenght = 5;
}
Path.prototype.setDown = function (value) {
    this.down = 'M1 ' + value;
}
Path.prototype.setUp = function (value) {
    this.up = 'M1 ' + value;
}
Path.prototype.drawX = function () {
    var codes = [];
    codes.push(this.up);
    this.x += this.spacing.x;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.start.y
    }))
    codes.push(this.down);
    this.x = this.x + this.xLenght;
    codes.push(util.fromPoint({
        x: this.x,
        y: this.start.y
    }))
    if (this.x > this.max.x) {
        this.xDone = true;
    }
    return codes;
}
Path.prototype.drawY = function () {
    var codes = [];
    codes.push(this.up);
    this.y += this.spacing.y;
    codes.push(util.fromPoint({
        x: this.start.x,
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
Path.prototype.getNext = function () {
    var codes = [];
    if (!this.xDone) {
        return this.drawX()
    }
    return codes;
}

module.exports = Path;
