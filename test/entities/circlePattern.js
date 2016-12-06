var fs = require('fs');
var tap = require('tap');
var util = require('../../lib/util')
var CirclePattern = require('../../lib/circlePattern');
var Tri = require('../../lib/tri');

tap.test('CirclePattern setup', (childTest) => {
    var coords =  util.load('1.svg').paths.map((path) => {
        return util.scale(0.1, path)
    })

    var pattern = new CirclePattern({x: 0, y: 0}, coords, 100, 10);
    pattern.setDown(4);
    pattern.setUp(6)
    tap.ok(pattern.x === 0, 'y');
    tap.ok(pattern.y === 0, 'x');
    tap.ok(pattern.amount === 10, 'Amount');
    tap.ok(pattern.r === 100, 'Radius');
    tap.ok(pattern.paths.length === 10, 'path.length')
    var coord = true;
    var count = 0;
    do {
        count++;
        coord = pattern.getNext();
        // console.log(coord);
        tap.ok(typeof coord !== 'undefined', 'coord nr. ' + count)
    } while(coord !== false);
    
    childTest.end()

})

tap.test('CirclePattern with tri', (childTest) => {
    var coords = new Tri({x: 0, y: 0}, 10, 10).paths

    var pattern = new CirclePattern({x: 0, y: 0}, coords, 100, 10);
    pattern.setDown(4);
    pattern.setUp(6)
    tap.ok(pattern.x === 0, 'y');
    tap.ok(pattern.y === 0, 'x');
    tap.ok(pattern.amount === 10, 'Amount');
    tap.ok(pattern.r === 100, 'Radius');
    tap.ok(pattern.paths.length === 10, 'path.length')
    var coord = true;
    var count = 0;
    do {
        count++;
        coord = pattern.getNext();
        // console.log(coord);
        tap.ok(typeof coord !== 'undefined', 'coord nr. ' + count)
    } while(coord !== false);
    
    childTest.end()

})


