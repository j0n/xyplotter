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


    tap.pass(pattern.paths.lenght === 10)
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


    tap.pass(pattern.paths.lenght === 10)
    pattern.paths.forEach((item, index) => {
        tap.pass(item.y === pattern.y + pattern.size * index);
        tap.pass(item.x === pattern.x);
    })
    while(pattern.getNext() !== false) {
        // check that there is an end to the pattern
    }
    
    childTest.end()

})

