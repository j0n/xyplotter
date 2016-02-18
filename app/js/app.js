var commandos = [];
var commandEl = null;
var file = require('./lib/file');
// var svg = require('./lib/svg');
// var api = require('./lib/api');
var $ = (id) => {
    return document.getElementById(id)
}
window.onload = function () {
    var fileInput = document.getElementById('svg-file')
    file.setup(fileInput)
        .on('uploaded', (data) => {
            console.log('file uploaded', data);
        })
        .on('error', (err) => {
            console.log('error on file upload', err)
        })


    $('play').addEventListener('click', () => {
        fetch('/play')
    })
    $('pause').addEventListener('click', () => {
        fetch('/pause')
    })

    document.getElementById('home').addEventListener('click', () => {
        fetch('/go/0/0')
    })
    commandEl = document.getElementById('commandos');
    document.getElementById('my').addEventListener('submit', function (e) {
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
        commandEl.insertBefore(commandoDiv, commandEl.childNodes[0]);
    } else {
        commandEl.appendChild(commandoDiv);
    }
    if (commandos.length > 0) {
        renderCommandos();
    }
}
