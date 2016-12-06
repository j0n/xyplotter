var Path = require('./Path');
var util = require('./util');

var Tri = function (pos, height, width) {
    var path = [
        pos,
        {
            x: pos.x + width/2,
            y: pos.y + height
        },
        {
            x: pos.x + width,
            y: pos.y
        }];
    Path.call(this, pos.x, pos.y, [path]);
}
Tri.prototype = Object.assign({}, Path.prototype);
module.exports = Tri;
