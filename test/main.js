var texts = document.getElementsByClassName('random-text');
for (var i = 0, text; text = texts[i]; ++i) {
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  var capChars = '';
  var numChars = '0123456789';

  if (text.classList.contains('random-text-caps')) {
    chars = capChars;
  }
  if (text.classList.contains('random-text-nums')) {
    chars = numChars;
  }

  // var length = 800;
  var length = 400;
  text.innerHTML = randomText(chars, length);
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function randomText(chars, length) {
  var result = '';
  var spaceIndex = 0;
  var wordLength = randomInt(3,6);
  for (var i = 0; i < length; ++i) {
    result += chars[Math.floor(Math.random() * chars.length)];
    if (i === spaceIndex + wordLength) {
      result += ' ';
      spaceIndex = i;
      wordLength = randomInt(3,10);
    }
  }
  return result;
}

var counters = document.getElementsByClassName('counter');
for (var i = 0, element; element = counters[i]; ++i) {
  element.innerHTML = 0;
}
counterTick();

function counterTick() {
  for (var i = 0, element; element = counters[i]; ++i) {
    element.innerHTML = +element.innerHTML + 1;
  }
  setTimeout(counterTick, 1);
}


var syncTexts = document.getElementsByClassName('sync-text');
var savedSyncText = localStorage.getItem('sync-text');
if (!savedSyncText) {
  savedSyncText = '';
}
updateSyncText(savedSyncText);
function updateSyncText(value) {
  savedSyncText = value;
  localStorage.setItem('sync-text', savedSyncText);
  for (var i = 0, text; text = syncTexts[i]; ++i) {
    text.value = value;
  }
}
for (var i = 0, text; text = syncTexts[i]; ++i) {
  text.addEventListener('input', function(e) {
    updateSyncText(this.value);
  });
}
var dark = JSON.parse(localStorage.getItem('dark'));
if (dark) {
  dark = false;
  toggleDark();
}
function toggleDark() {
  document.body.classList.toggle('dark');
  dark = !dark;
  localStorage.setItem('dark', dark);
}
document.querySelector('#dark-button').addEventListener('click', toggleDark);

var ss01Button = document.querySelector('#ss01-button');
ss01Button.addEventListener('click', toggleSs01);
var ss02Button = document.querySelector('#ss02-button');
ss02Button.addEventListener('click', toggleSs02);
var tnumButton = document.querySelector('#tnum-button');
tnumButton.addEventListener('click', toggleTnum);
var kernButton = document.querySelector('#kern-button');
kernButton.addEventListener('click', toggleKern);

var ss01 = JSON.parse(localStorage.getItem('ss01'));
var ss02 = JSON.parse(localStorage.getItem('ss02'));
var tnum = JSON.parse(localStorage.getItem('tnum'));
var kern = JSON.parse(localStorage.getItem('kern'));

if (ss01) {
  ss01 = false;
  toggleSs01();
}
if (ss02) {
  ss02 = false;
  toggleSs02();
}
if (tnum) {
  tnum = false;
  toggleTnum();
}
if (kern || kern === null) {
  kern = false;
  toggleKern();
}

function toggleSs01() {
  ss01 = !ss01;
  ss01Button.classList.toggle('button--enabled');
  localStorage.setItem('ss01', ss01);
  updateFontFeatureSettings();
}
function toggleSs02() {
  ss02 = !ss02;
  ss02Button.classList.toggle('button--enabled');
  localStorage.setItem('ss02', ss02);
  updateFontFeatureSettings();
}
function toggleTnum() {
  tnum = !tnum;
  tnumButton.classList.toggle('button--enabled');
  localStorage.setItem('tnum', tnum);
  updateFontFeatureSettings();
}
function toggleKern() {
  kern = !kern;
  kernButton.classList.toggle('button--enabled');
  localStorage.setItem('kern', kern);
  updateFontFeatureSettings();
}

function updateFontFeatureSettings() {
  var values = [];
  if (ss01) values.push("'ss01'");
  if (ss02) values.push("'ss02'");
  if (tnum) values.push("'tnum'");
  if (kern) values.push("'kern' 0");
  document.body.style.fontFeatureSettings = values.join(',');
}

var uppercaseButton = document.querySelector('#uppercase-button');
uppercaseButton.addEventListener('click', toggleTextCase);
var uppercase = JSON.parse(localStorage.getItem('uppercase'));
if (uppercase) {
  uppercase = false;
  toggleTextCase();
}
function toggleTextCase() {
  document.body.classList.toggle('uppercase');
  uppercaseButton.classList.toggle('button--enabled');
  uppercase = !uppercase;
  localStorage.setItem('uppercase', uppercase);
}



/*
var fgColor = document.getElementById('fg-color');
var bgColor = document.getElementById('bg-color');

fgColor.value = localStorage.getItem('fg-color')
    || window.getComputedStyle(document.body).color;
document.body.style.color = fgColor.value;
bgColor.value = localStorage.getItem('bg-color')
    || window.getComputedStyle(document.body).backgroundColor;
document.body.style.backgroundColor = bgColor.value;
fgColor.addEventListener('input', function(e) {
  document.body.style.color = fgColor.value;
  localStorage.setItem('fg-color', fgColor.value)
});
bgColor.addEventListener('input', function(e) {
  document.body.style.backgroundColor = bgColor.value;
  localStorage.setItem('bg-color', bgColor.value)
});
*/


var words = document.getElementById('words');
var wordsHtml = words.innerHTML;
var wordss = document.getElementsByClassName('words');
for (var i = 0, e; e = wordss[i]; ++i) {
  e.innerHTML = wordsHtml;
}


var desiredWidth = 90;

var sortedElements = document.getElementsByClassName('sort');
Array.from(sortedElements).forEach(function(e, i) {
  var words = e.innerHTML.split(/\s/g);
  e.innerHTML = '';
  var text = '';
  for (var j = 0; j < words.length; ++j) {
    var word = document.createElement('span');
    word.innerHTML = words[j];
    e.appendChild(word);
      console.log(word.offsetWidth);
  }

  window.setTimeout(function() {
    var sortedWords = Array.from(e.children).sort(function(e1, e2) {
      var width1 = e1.offsetWidth;
      var width2 = e2.offsetWidth;
      return width1 < width2 ? 0 : -1;
    });
    for (var i = 0, word; word = sortedWords[i]; ++i) {
      if (word.offsetWidth > 450) continue;
      var spacing = 0.05 * (desiredWidth - word.offsetWidth);
      if (spacing === 0) {
        word.style.textDecoration = 'underline';
      }
      word.style.letterSpacing = spacing + 'px';
      e.appendChild(word);
      e.appendChild(document.createElement('br'));
      word.classList.add('sort-word');
    }
  }, 200);
});
