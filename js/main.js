let loop;

updateColourCode();

$('.pallete').on('mousedown', function(e) {
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
      // case 'resetBtn':
      // setNewColor(0,0,0); break;
    }
    updateColourCode();
  }, 100);
  return false;
});

$('.pallete').on('mouseup', function() {
  clearInterval(loop);
  return false;
})

$(document).on('click', function(e) {
  $('#help').fadeOut(500);
  if (e.target.id == 'savedColors') {
    saveColor();
  } else if (e.target.className == "delBtn") {
    e.target.parentNode.remove();
  } else if (e.target.id == "helpBtn") {
    $('#help').fadeIn(500);
  } else if (e.target.id == 'resetBtn') {
    setNewColor(0, 0, 0);
    updateColourCode();
  }
});

$(document).on('keypress', function(e) {
  $('#help').fadeOut(500);
  let c = getCurrentColor();
  console.log(e.charCode);
  switch (e.charCode) {
    case 114: setNewColor((c.red + 1) % 255, c.green, c.blue); break;
    case 103: setNewColor(c.red, (c.green + 1) % 255, c.blue); break;
    case 98: setNewColor(c.red, c.green, (c.blue + 1) % 255); break;
    case 0: saveColor(); break;
  }
  updateColourCode();
})

function getCurrentColor() {
  let color = $('.wrap').css('background-color').replace('rgb(', '').replace(')', '').split(',');
  return {red: Number(color[0]), green: Number(color[1]), blue: Number(color[2])}
}

function setNewColor(r, g, b) {
  $('.wrap').css('background-color', "rgb(" + r + ", " + g + ", " + b + ")");
}

function saveColor() {
  let savedColor = document.createElement('div');
  savedColor.className = 'background';
  savedColor.style.backgroundColor = $('.wrap').css('background-color');
  let delBtn = document.createElement('h3');
  delBtn.innerHTML = ' 	&#128465';
  delBtn.className = 'delBtn';
  delBtn.style.color = $('.wrap').css('background-color');
  let colorCode = document.createElement('h1');
  colorCode.innerText = getColourCode();
  colorCode.style.color = $('.wrap').css('background-color');
  colorCode.className = 'colourCode';
  savedColor.appendChild(colorCode);
  savedColor.appendChild(delBtn);
  document.getElementById('savedColors').appendChild(savedColor);

  $('#alertAdded').fadeIn(500);
  setTimeout(function () {
    $('#alertAdded').fadeOut(500);
  }, 1000);
}

function updateColourCode() {
  let c = getCurrentColor();
  $('#red').text(c.red);
  $('#green').text(c.green);
  $('#blue').text(c.blue);
}

function getColourCode() {
  let c = getCurrentColor();
  let str = "#";

  for (let rgb of [
      c.red.toString(16),
      c.green.toString(16),
      c.blue.toString(16),
    ]) {
    if (rgb.length == 1)
      str += "0" + rgb;
    else
      str += rgb;
  }
  return str;
}
