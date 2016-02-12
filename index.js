var SerialPort = require("serialport").SerialPort; // localize object constructor

var util = require('./lib/util');
// var serialPort = new SerialPort('/dev/tty.wchusbserialfd130', {
var serialPort = new SerialPort('/dev/tty.wchusbserialfa140', {
  baudrate: 115200
})

var circles = require('./lib/circles');
var enteties = [];
var values = {
  up: 42, 
  down: 36
}

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    var st = data.toString().replace(/\r\n/, '');
    if (data.toString().replace(/\r\n/, '') === 'OK') {
      next();
    }
    else {
      console.log('not ok data received: ' + data);
    }
  });
});
serialPort.on("close", function () {
  console.log('close');
})
var codes = [];

function random (amount) {
  for (var i = 0; i < amount; i++) {
    codes.push('G0 X'+ Math.floor((Math.random() * 50)) + ' Y'+ Math.floor((Math.random() * 100)));
    if (i === 0) {
      codes.push('M1 140');
    }
  }
  codes.push('M1 120');
  codes.push('G0 X0 Y0');
}


function next() {
  console.log('next', codes.length);
  if (codes.length > 0) {
    var gCode = codes.shift();
    serialPort.write(gCode + '\n', function(err, results, yo) {
      if (err) {
        console.log('err ' + err);
      }
      // console.log('results ' + results);
    });
  } else {
      if (enteties.length > 0) {
        var nextCoords = enteties[0].getNext()
        if (nextCoords === false) {
          enteties.shift();
          next();
        }
        else {
          console.log('next coords from entity');
          codes = nextCoords;
          next();
        }
      } else {
          console.log('END');
      }

  }
}
module.exports.downValue = function (value) {
  values.down = value;
  enteties.forEach((entity) => {
    entity.setDown(values.down);
  })
}
module.exports.upValue = function (value) {
  values.up = value;
  enteties.forEach((entity) => {
    entity.setUp(values.up);
  })
}
module.exports.addEntitiy = function(x, y, amount, min, max) {
  var entity = new circles.Flow(
    {x:x*1, y:y*1},
    amount*1,
    min,
    max);
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
}
module.exports.abort = function() {
  codes.push(values.up);
  enteties = [];
}
module.exports.goHome = function () {
  enteties[0].goHome();
}
module.exports.go = function(x, y) {
  codes.push(util.fromPoint({x: x *1, y: y * 1}));
  if (codes.length === 1) {
    next()
  }
}
module.exports.m = function(value) {
  codes.push('M1 ' + value * 1);
  if (codes.length === 1) {
    next()
  }
}
module.exports.next = next;
module.exports.info = () => {
  return values;
}
module.exports.test = (x, y, n, r) => {
  for (var i = 0; i < 10; i ++) {
    var entity = new circles.Circle(
      (i * 2) + x * 1,
      (i * 2) + y * 1,
      n * 1,
      (i * 2) + r * 1
    );
    entity.setUp(values.up);
    entity.setDown(values.down);
    enteties.push(entity);
  }
}
module.exports.rect = (x, y, width, height, n) => {
  var entity = new circles.Rect(
    x * 1,
    y * 1,
    width * 1,
    height * 1,
    n * 1
  );
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
}
