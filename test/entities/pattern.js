var fs = require('fs');
var tap = require('tap');
var Pattern = require('../../lib/pattern');
tap.test('X Pattern setup', (childTest) => {

    var pattern = new Pattern(0, 0, '1.svg', 'x', 10, 10);
    tap.pass(pattern.x === 0);
    tap.pass(pattern.y === 0);
    tap.pass(pattern.pathName === '1.svg');
    tap.pass(pattern.size === 10);
    tap.pass(pattern.amount === 10);


    tap.pass(pattern.paths.length === 10)
    pattern.paths.forEach((item, index) => {
        tap.pass(item.x === pattern.x + pattern.size * index);
        tap.pass(item.y === pattern.y);
    })
    while(pattern.getNext() !== false) {
        // check that there is an end to the pattern
    }
    
    childTest.end()

})

tap.test('Y Pattern setup', (childTest) => {

    var pattern = new Pattern(0, 0, '1.svg', 'x', 10, 10);
    tap.pass(pattern.x === 0);
    tap.pass(pattern.y === 0);
    tap.pass(pattern.pathName === '1.svg');
    tap.pass(pattern.size === 10);
    tap.pass(pattern.amount === 10);


    tap.pass(pattern.paths.length === 10)
    pattern.paths.forEach((item, index) => {
        tap.pass(item.y === pattern.y + pattern.size * index);
        tap.pass(item.x === pattern.x);
    })
    while(pattern.getNext() !== false) {
        // check that there is an end to the pattern
    }
    
    childTest.end()

})

tap.test('Y Pattern with wait', (childTest) => {

    var pattern = new Pattern(0, 0, '1.svg', 'x', 10, 10, 0.1, true);
    pattern.wait = true
    pattern.setUp(5);
    pattern.setDown(15);
    tap.ok(pattern.x === 0, 'y');
    tap.ok(pattern.y === 0, 'y');
    tap.ok(pattern.pathName === '1.svg', 'name');
    tap.ok(pattern.size === 10, 'size');
    tap.ok(pattern.amount === 10, 'amount');
    tap.ok(pattern.wait === true, 'wait');


    tap.ok(pattern.paths.length === 10, 'paths')
    var codes = pattern.getNext();
    tap.ok(codes[0] === 'wait', 'check first wait')
    /*
    pattern.paths.forEach((item, index) => {
        tap.pass(item.y === pattern.y + pattern.size * index);
        tap.pass(item.x === pattern.x);
    })
    */
    while(pattern.getNext() !== false) {
        // check that there is an end to the pattern
    }
    
    childTest.end()

})
