var Entity = require('./entity');
var util = require('./util');

var Line = function (x, y, goalX, goalY) {
    Entity.call(this, x, y);
    this.goal = {
        x: goalX,
        y: goalY
    }
    this.first = true;
    this.ended = false;
}
Line.prototype = Entity.prototype;
Line.prototype.getNext = function() {
    if (this.ended) {
        return false;
    }
    var codes = [];
    // split up line to two frames
    // so we can stop it if something 
    // goes to thell
    if (this.first) {
        codes.push(this.up)
        codes.push(util.fromPoint({
            x: this.x,
            y: this.y
        }))
        this.first = false;
    } else {
        codes.push(this.down)
        codes.push(util.fromPoint({
            x: this.goal.x,
            y: this.goal.y
        }))
        codes.push(this.up);
        this.ended = true;
    }

    return codes;
}
module.exports = Line;
