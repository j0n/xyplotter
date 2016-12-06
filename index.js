var SerialPort = require('serialport').SerialPort;

var util = require('./lib/util');
var fs = require('fs');
var Path = require('./lib/path');
var Pattern = require('./lib/pattern');
//var serialPort = new SerialPort('/dev/tty.wchusbserialfd130', {
var serialPort = new SerialPort('/dev/tty.wchusbserialfa140', {
  baudrate: 115200
})

var circles = require('./lib/circles');
var pause = false;
var enteties = [];
var values = {
  up: 42,
  down: 36
}
if (fs.existsSync('./store/settings.json', 'utf8')) {
    values = JSON.parse(fs.readFileSync('./store/settings.json', 'utf8'))
}
var saveSettings = function() {
    fs.writeFile('./store/settings.json', JSON.stringify(values), (err) => {
        if (err) {
            return console.log('error saving settings', err);
        }
        console.log('settings saved')
    })
}

serialPort.on('open', function () {
  console.log('open');
  serialPort.on('data', function (data) {
    if (data.toString().replace(/\r\n/, '') === 'OK') {
      next();
    } else {
      console.log('not ok data received: ' + data);
    }
  });
});
serialPort.on('close', function () {
  console.log('close');
})
var codes = [];

function next () {
  if (pause) {
      console.log('pause');
      return false
  }
  if (codes.length > 0) {
    var gCode = codes.shift();
    if (gCode === 'wait') {
        console.log('waiting');
        setTimeout(next, 250);
        return false;
    }
    console.log('write', gCode);
    serialPort.write(gCode + '\n', function (err, results, yo) {
      if (err) {
        console.log('err ' + err);
      }
      // console.log('results ' + results);
    });
  } else {
      console.log('enteties.length', enteties.length);
    if (enteties.length > 0) {
      var nextCoords = enteties[0].getNext()
          console.log('curretn id', enteties[0].id);
      if (nextCoords === false) {
        enteties.shift();
        setTimeout(next, 100);
      } else {
        codes = nextCoords;
        setTimeout(next, 100);
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
  saveSettings();
}
module.exports.upValue = function (value) {
  values.up = value;
  enteties.forEach((entity) => {
    entity.setUp(values.up);
  })
  saveSettings();
}
/*
module.exports.addEntitiy = function(x, y, amount, min, max) {
  var entity = new circles.Flow(
    {x:x*1, y:y*1},
    amount*1,
    min,
    max);
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
} */
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
module.exports.goDown = function () {
    codes.push(util.mCode(values.down));
    if (codes.length === 1) {
        next()
    }
}
module.exports.goUp = function () {
    codes.push(util.mCode(values.up));
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

module.exports.path = function (x, y, paths) {
  var entity = new Path(
    x * 1,
    y * 1,
    paths
  );
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
}
module.exports.pause = (value) => {
    pause = typeof value === 'undefined' ? true : value
    console.log('pause', pause);
}
module.exports.pattern = (x, y, width, height) => {
  var entity = new Pattern(
    x * 1,
    y * 1,
    width * 1,
    height * 1
  );
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
}
module.exports.addEntity = (entity) => {
    console.log('adding ENTITY');
  entity.setUp(values.up);
  entity.setDown(values.down);
  enteties.push(entity);
}


