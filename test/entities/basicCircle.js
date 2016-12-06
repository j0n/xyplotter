var fs = require('fs');
var tap = require('tap');
var Circle = require('../../lib/circles/basic');
tap.test('Line', (childTest) => {

    var line = new Circle(0, 0, 10);
    line.setUp(5);
    line.setDown(1);
    tap.pass(line.x === 0);
    tap.pass(line.y === 0);
    tap.pass(line.r === 10);

    var coord = true;
    do {
        coord = line.getNext();
        // tap.ok(typeof coord !== 'undefined', typeof coord + ' ' + count)
    } while(coord !== false);
    
    childTest.end()

})
