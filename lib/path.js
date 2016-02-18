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
}
Path.prototype.setDown = function(value) {
  this.down = 'M1 ' + value;
}
Path.prototype.setUp = function(value) {
  this.up = 'M1 ' + value;
}
Path.prototype.getNext = function() {
  var codes = [];
  if (this.paths.length === 0 && 
      this.points.length == 0 && 
      !this.finished) {

      this.finished = true
      return ['wait', this.up, 'wait']
  }
  
  if (this.paths.length === 0 && 
      this.points.length == 0 && 
      this.finished) {

      return false
  }

  if (this.points.length === 0) {
      this.points = this.paths.shift();
      this.newPath = true
      codes.push('wait');
      codes.push(this.up);
      codes.push('wait');
  }
  if (this.points.length > 0 ) {
      var point = this.points.shift();
      codes.push(util.fromPoint({
          x: this.x + point.x,
          y: this.y + point.y
      }));
      if (this.newPath) {
          this.newPath = false;
          codes.push('wait');
          codes.push(this.down);
          codes.push('wait');
      }
  }
  return codes;

}

module.exports = Path;
