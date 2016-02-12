var util = require('./util');

/*
function flow (point, amount) {
  var codes = [];
  codes.push('M1 45');
  codes.push(util.fromPoint((point)));
  var angle = Math.floor(360/amount);
  for (var i = 0; i < amount; i++) {
    var dist = 15 + Math.floor((Math.random() * 30));
    codes.push('M5 35');
    var flowPoint = {
      x : point.x +  Math.floor(((Math.sin((angle * i) * (Math.PI / 180)) * dist)) * 100) /100 ,
      y: point.y + Math.floor(((Math.cos((angle * i) *(Math.PI / 180)) * dist)) * 100) / 100
    }
    codes.push(util.fromPoint(flowPoint));
    codes.push('M1 49');
    codes.push(util.fromPoint((point)));
  }
  codes.push('M1 45');
  return codes;
}
*/

var getNext = function(index) {
    var dist = 15 + Math.floor((Math.random() * 30));
    codes.push('M5 35');
    var flowPoint = {
      x : point.x +  Math.floor(((Math.sin((angle * index) * (Math.PI / 180)) * dist)) * 100) /100 ,
      y: point.y + Math.floor(((Math.cos((angle * index) *(Math.PI / 180)) * dist)) * 100) / 100
    }
    codes.push(util.fromPoint(flowPoint));
    codes.push('M1 49');
    codes.push(util.fromPoint((point)));
}
var Flow = function(startPoint, amount, min, max) {
  this.min = min || 15;
  this.max = max || 30;
  this.startPoint = startPoint;
  this.maxIndex = amount;
  this.angle = Math.floor(360/amount);
  this.currentIndex = 0;
  this.newMax();
  this.newMin();
  this.currentDist = this.min;
  this.startDist = this.currentDist;
  this.goAgainsStartDist = false;
  this.directionMax = true
}
Flow.prototype.newMax = function () {
  this.maxGoal = this.min + Math.floor((Math.random() * this.max));
}
Flow.prototype.newMin = function () {
  this.minGoal = this.min + Math.floor((Math.random() * this.min));
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
Flow.prototype.goHome = function() {
  this.goAgainsStartDist = true
}
Flow.prototype.getNext = function() {
    var codes = [];
    if (this.currentIndex === 0) {
      codes = this.start();
      console.log('START');
      this.currentIndex++;
      return codes;
    if (this.currentIndex > this.maxIndex) {
    }
      console.log('END');
      this.done = true;
      return false;
    }
    var index = this.currentIndex;
    if (this.goAgainsStartDist) {
      if (this.currentDist > this.startDist) {
        this.currentDist--
      }
      else if (this.currentDist < this.startDist) {
        this.currentDist++;
      }
    }
    else {
      if (this.directionMax) {
          this.currentDist++
          if (this.currentDist > this.max) {
            this.newMin();
            this.directionMax = false;
          }
      }
      if (!this.directionMax) {
        this.currentDist--;
        if (this.currentDist < this.min) {
          this.newMax();
          this.directionMax = true;
        }
      }
    }
    console.log(this.currentDist);

    var flowPoint = {
      x: this.startPoint.x +  Math.floor(((Math.sin((this.angle * index) * (Math.PI / 180)) * this.currentDist)) * 100) /100 ,
      y: this.startPoint.y + Math.floor(((Math.cos((this.angle * index) *(Math.PI / 180)) * this.currentDist)) * 100) / 100
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

// module.exports.flow = flow;
module.exports.Flow = Flow;
var Circle = function (x, y, n, r) {
  this.x = x;
  this.y = y;
  this.n = n;
  this.r = r;
  this.currentIndex = 0;
}
Circle.prototype.setDown = function(value) {
  this.down = 'M1 ' + value;
}
Circle.prototype.setUp = function(value) {
  this.up = 'M1 ' + value;
}
Circle.prototype.getNext = function() {
  var codes = [];
  if (this.currentIndex > this.n) {
    console.log('END');
    return false;
  }
   var p = this.currentIndex / this.n;
   var  a = 2 * Math.PI * p
   var px = this.x + Math.cos(a) * this.r
   var py = this.y + Math.sin(a) * this.r
   codes.push(util.fromPoint({
     x: Math.round(px * 100) / 100,
     y: Math.round(py * 100) / 100
   }));
  if (this.currentIndex === 0) {
    codes.push(this.down);
  }
   this.currentIndex++
   if (this.currentIndex > this.n) {
      codes.push(this.up);
   }
   return codes;
}

module.exports.Circle = Circle;
module.exports.test = function (x, y, n, r) {
  var result = []
  for (var i = 0; i < n; i++) {
     var p = i / n;
     var  a = 2 * Math.PI * p
     var px = x + Math.cos(a) * r
     var py = y + Math.sin(a) * r
     console.log('a', a, 'p', p, 'px', px, 'py', py);
     result.push(util.fromPoint({
       x: Math.round(px * 100) / 100,
       y: Math.round(py * 100) / 100
     }));
  }
  return result
}
var Rect = function (x, y, width, height, n) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.n = n;
  console.log('this.height', this.height)
  console.log('this.y', this.y)
  this.currentIndex = 0;
}
Rect.prototype.setDown = function(value) {
  this.down = 'M1 ' + value;
}
Rect.prototype.setUp = function(value) {
  this.up = 'M1 ' + value;
}
Rect.prototype.getNext = function() {
  var codes = [];
  console.log(this.height + this.y, this.n * this.currentIndex);
  if ((this.height) < this.n * this.currentIndex) {
    console.log('RECT END');
    return false;
  }
   codes.push(util.fromPoint({
     x: this.x,
     y: this.y + (this.currentIndex * this.n)
   }));
  if (this.currentIndex === 0) {
    codes.push(this.down);
  }
   codes.push(util.fromPoint({
     x: this.x + this.width,
     y: this.y + (this.currentIndex * this.n)
   }));
   this.currentIndex++
  if ((this.height) < this.n * this.currentIndex) {
      codes.push(this.up);
   }
   return codes;
}

module.exports.Rect = Rect;

