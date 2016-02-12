console.log('fo');
var commandos = [];
var commandEl = null;
window.onload = function() {
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

