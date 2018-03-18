$(window).resize(function() {
  style();
})

$(document).ready(function() {
  style();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  $('body').on("contextmenu", function() {
    return false;
  })
  clickEvents()
})

function style() {
  var screenMarginTop = window.innerHeight - 912
  var screenMarginLeft = (window.innerWidth - 1200) / 2
  var itemCountMarginTop = screenMarginTop + 624
  var infoMarginLeft = screenMarginLeft + 768

  $('#screen').css('margin-top', screenMarginTop)
  $('#screen').css('margin-left', screenMarginLeft)
  $('#buildselect').css('margin-top', screenMarginTop)
  $('#buildselect').css('margin-left', screenMarginLeft)
  $('#info').css('margin-top', itemCountMarginTop)
  $('#info').css('margin-left', infoMarginLeft)
  $('#itemcount').css('margin-top', itemCountMarginTop)
  $('#itemcount').css('margin-left', screenMarginLeft)
  screenleftpos = screenMarginLeft
  screentoppos = screenMarginTop
  infoleftpos = infoMarginLeft
  itemcounttoppos = itemCountMarginTop
}

function pxToInt(px) {
  return parseInt(px.substring(0, px.length - 2))
}

//SELECTION UND BOX TRACKING

var screenleftpos = 0
var screentoppos = 0

var infoleftpos = 0
var itemcounttoppos = 0

var cursorScreenX = -1
var cursorScreenY = -1

var cursorItemCountX = -1
var cursorItemCountY = -1

var cursorInfoX = -1
var cursorInfoY = -1

var isCursorInScreen = true
var isCursorInItemCount = true
var isCursorInInfo = true

function onDocumentMouseMove(event) {

  var mX = event.clientX - screenleftpos;
  var mY = event.clientY - screentoppos;
  if (mX < 0 || mX > 1200 || mY < 0 || mY > 576) {
    cursorScreenX = -1
    cursorScreenY = -1
    mX = event.clientX - screenleftpos;
    mY = event.clientY - itemcounttoppos;
    if (mX < 0 || mX > 720 || mY < 0 || mY > 240) {
      cursorItemCountX = -1
      cursorItemCountY = -1
      mX = event.clientX - infoleftpos;
      mY = event.clientY - itemcounttoppos;
      if (mX < 0 || mX > 432 || mY < 0 || mY > 240) {
        cursorInfoX = -1
        cursorInfoY = -1
      } else {
        cursorInfoX = Math.floor(mX / 48);
        cursorInfoY = Math.floor(mY / 48);
      }
    } else {
      cursorItemCountX = Math.floor(mX / 48);
      cursorItemCountY = Math.floor(mY / 48);
    }
  } else {
    cursorScreenX = Math.floor(mX / 48);
    cursorScreenY = Math.floor(mY / 48);
  }
  if (cursorScreenX != -1 && cursorScreenY != -1) {
    isCursorInScreen = true
  } else {
    isCursorInScreen = false
  }

  if (cursorItemCountX != -1 && cursorItemCountY != -1) {
    isCursorInItemCount = true
  } else {
    isCursorInItemCount = false
  }

  if (cursorInfoX != -1 && cursorInfoY != -1) {
    isCursorInInfo = true
  } else {
    isCursorInInfo = false
  }
}

function clickEvents() {
  $('#info').click(function() {
    if (cursorInfoY == 0) {
      switch (cursorInfoX) {
        case 0:
          //BUILD BUTTON
          if (mode == "none") {
            $('#buildselect').fadeIn(200)
            mode = "selectbuilding"
          } else {
            $('#buildselect').fadeOut(200)
            mode = "none"
          }
          break
      }
    }
  })
}

var toBuild = {}

function buildEvents(){
  $('img').click(function() {
    var id = $(this).attr("id");
    if(id.startsWith("build_")){
      id = parseInt(id.substr(6))
      toBuild = tileClasses[id]
      mode = "build"
      $('#buildselect').fadeOut(200)
    }
  })
}
