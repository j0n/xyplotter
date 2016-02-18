var commandos = [];
var commandEl = null;
var file = require('./lib/file');
var svg = require('./lib/svg');
window.onload = function () {
    document.getElementById('svg-file')
        .addEventListener('change', function (event) {
            console.log(this.files);
            if (this.files.length > 0) {
                file.getAsText(this.files[0])
                    .then((result) => {
                        console.log(svg.getPath(result));
                    })
            }
        })
  document.getElementById('home').addEventListener('click', () => {
    fetch('/go/0/0')
  })
  commandEl = document.getElementById('commandos');
  document.getElementById('my').addEventListener('submit', function(e) {
    e.preventDefault();
    commandos.push(document.getElementById('url').value);
    renderCommandos();
    fetch(document.getElementById('url').value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })

    console.log('submit');
  })
}

function renderCommandos () {
  var commandoDiv = document.createElement('div');
  commandoDiv.innerHTML = commandos.pop();
  if (commandEl.childNodes.length > 0) {
    commandEl.insertBefore(commandoDiv,commandEl.childNodes[0]);
  }
  else {
    commandEl.appendChild(commandoDiv);
  }
  if (commandos.length > 0) {
    renderCommandos();
  }
}

var fromSVG = function (svg) {
    return fetch(svg)
        .then((obj) => {
            return obj.text().then((data) => {
                var holder = document.getElementById('svg-holder');
                holder.innerHTML = data;
                var paths = Array.prototype.slice.call(
                                holder.querySelectorAll('path')
                            );
                return paths.map((path) => {
                    var points = [];
                    window.p = path;
                    for (var i = 0, ii = path.getTotalLength(); i < ii; i++) {
                        var svgPoint = path.getPointAtLength(i)
                        points.push({
                            x: svgPoint.x,
                            y: svgPoint.y
                        })
                    }
                    holder.innerHTML = '';
                    return points;
                })

            });
        })
}
fromSVG('/shape.svg').then((data) => {
    console.log('points', data);
    fetch('/save-to-gcode', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then((res) => {
        console.log('res', res);
    })

});
