var util = require('./util');
var Entity = function (x, y, width, height) {
    this.width = width;
    this.height = height;
    this.id = Math.round(Math.random() * 1000);
    this.x = x * 1;
    this.y = y * 1;
}
Entity.prototype.setDown = function (value) {
    this.down = 'M1 ' + value;
}
Entity.prototype.setUp = function (value) {
    this.up = 'M1 ' + value;
}
Entity.prototype.getNext = function () {
}

module.exports = Entity;
