var fs = require('fs');
var tap = require('tap');
var Line = require('../../lib/line');
tap.test('Line', (childTest) => {

    var line = new Line(0, 0, 10, 10);
    tap.pass(line.x === 0);
    tap.pass(line.y === 0);
    tap.pass(line.goal.y === 10);
    tap.pass(line.goal.x === 10);

    tap.pass(line.first === true)
    var codes = line.getNext();
    tap.pass(codes.length === 2);
    tap.pass(line.first === false)
    var codes = line.getNext();
    tap.pass(codes.length === 3);

    
    childTest.end()

})
