var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Line = require('./lib/line');
var Pattern = require('./lib/pattern');
var CirclePattern = require('./lib/circlePattern');
var BasicCircle = require('./lib/circles/basic');
var Tri = require('./lib/tri');
var xyUtil = require('./lib/util');

app.use(express.static('dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

var xy = require('./index');


app.post('/saveObject/:name/:threshold?', (req, res) => {
    xyUtil.save(req.params.name, req.body);
    res.send('Done')
})
app.get('/y/:name/:x/:y/:amount/:size/:wait?', (req, res) => {
    var pattern = new Pattern(
            req.params.x,
            req.params.y,
            req.params.name,
            'y',
            req.params.amount,
            req.params.size,
            0.4,
            req.params.wait ? true : false)
    xy.addEntity(pattern);

    res.send('added');
})
app.get('/file/:name/:x/:y/:scale/:wait?', (req, res) => {
    var pattern = new Pattern(
            req.params.x,
            req.params.y,
            req.params.name,
            'y',
            1,
            1,
            req.params.scale,
            req.params.wait ? true : false)
    xy.addEntity(pattern);

    res.send('added');
})
app.get('/x/:name/:x/:y/:amount/:size/:wait?', (req, res) => {
    console.log(req.params.wait);
    var pattern = new Pattern(
            req.params.x,
            req.params.y,
            req.params.name,
            'x',
            req.params.amount,
            req.params.size,
            0.1,
            req.params.wait ? true : false)
    xy.addEntity(pattern);
    res.send('added');
})
app.get('/circle/:x/:y/:r/:segments?', (req, res) => {
    console.log('adding BASIC');
    xy.addEntity(new BasicCircle(
                req.params.x,
                req.params.y,
                req.params.r,
                req.params.segments
            ))
    return res.send('added');
})

app.get('/circle/:name/:x/:y/:r/:amount', (req, res) => {
    console.log('adding pattern');

    var coords =  xyUtil.load(req.params.name).paths.map((path) => {
        return xyUtil.scale(0.1, path)
    })
    xy.addEntity(new CirclePattern(
            {
                x: req.params.x,
                y: req.params.y
            },
            coords,
            req.params.r,
            req.params.amount))
    res.send('added');
})

app.get('/circletri/:x/:y/:r/:amount/:width/:height', (req, res) => {
    console.log('adding pattern');

    var tri = new Tri({ x: 0, y: 0 }, req.params.width, req.params.height);
    xy.addEntity(new CirclePattern(
            {
                x: req.params.x,
                y: req.params.y
            },
            tri.paths,
            req.params.r,
            req.params.amount))
    res.send('added');
})
app.get('/draw/:name/:x/:y/:scale?', (req, res) => {
    var paths = xyUtil.load(req.params.name).paths.map((path) => {
        return xyUtil.scale(req.params.scale || 0.2, path)
    })
    xy.path(req.params.x, req.params.y, paths)
    res.send('addes');
})

app.get('/d/:value', (req, res) => {
  xy.downValue(req.params.value);
  res.send(xy.info());
})
app.get('/u/:value', (req, res) => {
  xy.upValue(req.params.value);
  res.send(xy.info());
})

app.get('/add/:x/:y/:amount/:min/:max', (req, res) => {
  xy.addEntitiy(
    req.params.x, 
    req.params.y,
    req.params.amount,
    req.params.min, 
    req.params.max
  );
  res.send('add');
});
app.get('/home', (req, res) => {
  xy.goHome();
  res.send('home');
});
app.get('/line/:x/:y/:dx/:dy', (req, res) => {
    var line = new Line(
        req.params.x, 
        req.params.y, 
        req.params.dx, 
        req.params.dy 
    )
    xy.addEntity(line);
    res.send('added');
})

app.get('/go/:x/:y', (req, res) => {
  xy.go(req.params.x, req.params.y);
  res.send('go');
});
app.get('/pattern/:x/:y/:width/:height', (req, res) => {
  xy.pattern(req.params.x, req.params.y, req.params.width, req.params.height);
  res.send('test');
});

app.get('/test/:x/:y/:n/:r', (req, res) => {
  xy.test(req.params.x, req.params.y, req.params.n, req.params.r);
  res.send('test');
});
app.get('/rect/:x/:y/:width/:height/:n', (req, res) => {
  xy.rect(req.params.x,
          req.params.y,
          req.params.width,
          req.params.height,
          req.params.n);
  res.send('recr');
});
app.get('/m/:value', (req, res) => {
  xy.m(req.params.value);
  res.send('m');
});

app.get('/abort', (req, res) => {
  xy.abort();
  res.send('abort');
});

app.get('/info', (req, res) => {
  res.send(xy.info());
})
app.get('/pause', (req, res) => {
    xy.pause();
    res.end('ok');
})
app.get('/play', (req, res) => {
    xy.pause(false);
    xy.next();
    res.end('ok');
})
app.get('/start', (req, res) => {
  xy.next();
  res.send('start');
});
app.get('/down', (req, res) => {
  xy.goDown();
  res.send('down');
});
app.get('/up', (req, res) => {
  xy.goUp();
  res.send('up');
});

app.listen(4444);
