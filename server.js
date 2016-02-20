var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var Line = require('./lib/line');
var Pattern = require('./lib/pattern');
var xyUtil = require('./lib/util');

app.use(express.static('dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

var xy = require('./index');


app.post('/saveObject/:name/:threshold?', (req, res) => {
    xyUtil.save(req.params.name, req.body);
    res.send('Done')
})
app.get('/y/:name/:x/:y/:amount/:size', (req, res) => {
    xy.addEntity(new Pattern(
            req.params.name,
            req.params.x,
            req.params.y,
            'y',
            req.params.amount,
            req.params.size,
            0.1))
    res.send('added');
})

app.get('/x/:name/:x/:y/:amount/:size', (req, res) => {
    xy.addEntity(new Pattern(
            req.params.name,
            req.params.x,
            req.params.y,
            'x',
            req.params.amount,
            req.params.size,
            0.1))
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
