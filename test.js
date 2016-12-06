var circles = require('./lib/circles');
var k = circles.flow({x: 40, y: 40}, 18)
console.log('k.length', k.length)
k = k.concat(circles.flow({x: 40, y: 40}, 18));
console.log('k.length', k.length)


