$(window).resize(function() {
  style();
})

$(document).ready(function() {
  style();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
})

var screenleftpos = 0
var screentoppos = 0

var cursorScreenX = -1
var cursorScreenY = -1

var isCursorInScreen = true

function style() {
  var screenMarginTop = window.innerHeight - 912
  var screenMarginLeft = (window.innerWidth - 1200) / 2
  var itemCountMarginTop = screenMarginTop+624
  var infoMarginLeft = screenMarginLeft+768

  $('#screen').css('margin-top', screenMarginTop)
  $('#screen').css('margin-left', screenMarginLeft)
  $('#info').css('margin-top', itemCountMarginTop)
  $('#info').css('margin-left', infoMarginLeft)
  $('#itemcount').css('margin-top', itemCountMarginTop)
  $('#itemcount').css('margin-left', screenMarginLeft)
  screenleftpos = pxToInt($('#screen').css("margin-left"))
  screentoppos = pxToInt($('#screen').css("margin-top"))
}

function pxToInt(px) {
  return parseInt(px.substring(0, px.length - 2))
}

function onDocumentMouseMove(event) {

  var mX = event.clientX - screenleftpos;
  var mY = event.clientY - screentoppos;
  if (mX < 0 || mX > 1200 || mY < 0 || mY > 576) {
    cursorScreenX = -1
    cursorScreenY = -1
  } else {
    cursorScreenX = Math.floor(mX / 48);
    cursorScreenY = Math.floor(mY / 48);
  }
  if (cursorScreenX != -1 && cursorScreenY != -1) {
    isCursorInScreen = true
  } else {
    isCursorInScreen = false
  }
}
