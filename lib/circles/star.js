var util = require('../util');

var Flow = function(startPoint, amount) {
  this.min = 15;
  this.rand = 30;
  this.startPoint = startPoint;
  this.maxIndex = amount;
  this.angle = Math.floor(360/amount);
  this.currentIndex = 0;
}
Flow.prototype.setDown = function(value) {
  this.down = 'M1 ' + value;
}
Flow.prototype.setUp = function(value) {
  this.up = 'M1 ' + value;
}
Flow.prototype.start = function () {
  this.done = false;
  var codes = [];
  codes.push(this.up);
  codes.push(util.fromPoint((this.startPoint)));
  return codes;
}
Flow.prototype.getNext = function() {
    var codes = [];
    var dist = this.min + Math.floor((Math.random() * this.rand));
    if (this.currentIndex === 0) {
      codes = this.start();
      console.log('START');
      this.currentIndex++;
      return codes;
    }
    if (this.currentIndex > this.maxIndex) {
      console.log('END');
      this.done = true;
      return false;
    }
    var index = this.currentIndex;
    var flowPoint = {
      x: this.startPoint.x +  Math.floor(((Math.sin((this.angle * index) * (Math.PI / 180)) * dist)) * 100) /100 ,
      y: this.startPoint.y + Math.floor(((Math.cos((this.angle * index) *(Math.PI / 180)) * dist)) * 100) / 100
    }
    codes.push(this.down);
    codes.push(util.fromPoint(flowPoint));
    codes.push(this.up);
    codes.push(util.fromPoint((this.startPoint)));
    this.currentIndex++;
    if (this.currentIndex > this.maxIndex) {
      codes.push(this.up);
    }

    return codes;
}

module.exports.Flow = Flow;
