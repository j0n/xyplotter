var util = require('../lib/util');
var fs = require('fs');
var tap = require('tap');

tap.test('simplify', (childTest) => {
    var points = [];
    for (var i = 0; i < 5; i++) {
        points.push({
            x: i * 0.2,
            y: i * 0.2
        })
    }
    tap.pass(points.length === 5);
    util.simplify(points, 0.3).map((item, index) => {
        tap.pass(item.x === index * 0.4)
        tap.pass(item.y === index * 0.4)
    })


    for (var j = 0; j < 5; j++) {
        points.push({
            x: 0,
            y: j * 0.2
        })
    }
    tap.pass(points.length === 5);
    util.simplify(points, 0.3).map((item, index) => {
        tap.pass(item.x === 0)
        tap.pass(item.y === index * 0.4)
    })


    childTest.end();
})

tap.test('fromPoint', (childTest) => {
    tap.pass(util.fromPoint({x: 0, y: 0}) === 'G0 X0 Y0');
    childTest.end();
})

tap.test('save', (childTest) => {
    var paths = [
        [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 1
            }
        ]];
    tap.pass(util.save('tap.test', paths) === true)
    tap.pass(fs.existsSync('./store/tap.test.json'))
    fs.unlinkSync('./store/tap.test.json');
    childTest.end();
})





