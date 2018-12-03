let loop;

$(document).on('mousedown', function(e) {
  loop = setInterval(function() {
    let c = getCurrentColor();
    switch (e.target.id) {
      case 'red':
      setNewColor((c.red + 5) % 255, c.green, c.blue);
      break;
      case 'green':
      setNewColor(c.red, (c.green + 5) % 255, c.blue);
      break;
      case 'blue':
      setNewColor(c.red, c.green, (c.blue + 5)% 255);
      break;
    }
  }, 100);
  return false;
});

$(document).on('mouseup', function() {
  clearInterval(loop);
  return false;
})

$(document).on('click', function(e) {
  if (e.target.id == 'savedColors') {
    saveColor();
  }
});

function getCurrentColor() {
  let color = $('.wrap').css('background-color').replace('rgb(', '').replace(')', '').split(',');
  return {red: Number(color[0]), green: Number(color[1]), blue: Number(color[2])}
}

function setNewColor(r, g, b) {
  console.log(r);
  $('.wrap').css('background-color', "rgb(" + r + ", " + g + ", " + b + ")");
}

function saveColor() {
  let savedColor = document.createElement('div');
  savedColor.className = 'background';
  savedColor.style.backgroundColor = $('.wrap').css('background-color');
  let colorCode = document.createElement('span');
  colorCode.innerText = "#443ca43";
  colorCode.style.color = $('.wrap').css('background-color');
  colorCode.style.filter = "invert(100%)";
  savedColor.appendChild(colorCode);
  document.getElementById('savedColors').appendChild(savedColor);
}

