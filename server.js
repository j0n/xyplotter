var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var xyUtil = require('./lib/util');

app.use(express.static('dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

var xy = {}// require('./index');


app.post('/save-to-gcode', (req, res) => {
    var body = req.body;
    xyUtil.save('test', body);
    res.send('Done')

})
app.get('/d/:value', (req, res) => {
  xy.downValue(req.params.value);
  res.send(xy.info());
})
app.get('/u/:value', (req, res) => {
  xy.upValue(req.params.value);
  res.send(xy.info());
})
app.get('/start', (req, res) => {
  xy.next();
  res.send('start');
});

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

app.get('/go/:x/:y', (req, res) => {
  xy.go(req.params.x, req.params.y);
  res.send('go');
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

app.listen(4444);
