var fs = require('fs');
var tap = require('tap');
var Tri = require('../../lib/tri');
tap.test('Tri', (childTest) => {

    var tri = new Tri({x: 0, y: 0}, 10, 10);
    tap.pass(tri.x === 0);
    tap.pass(tri.y === 0);
    tap.pass(tri.paths.length === 1);

    var codes = tri.getNext();
    tap.ok(codes[1] === 'G0 X0 Y0', 'first coord');
    codes = tri.getNext();
    tap.ok(codes[0] === 'G0 X5 Y10', 'second coord');
    codes = tri.getNext();
    tap.ok(codes[0] === 'G0 X10 Y0', 'second coord');
    codes = tri.getNext();
    codes = tri.getNext();
    tap.ok(codes === false, 'tri is ended');
    
    childTest.end()

})
