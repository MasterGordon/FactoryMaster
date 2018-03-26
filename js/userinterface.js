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
  $('#infoDesc').css('margin-top', itemCountMarginTop + 51)
  $('#infoDesc').css('margin-left', infoMarginLeft + 5)
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

var mousedown = false

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
  if (mousedown && mode == "build") {
    if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] == 0) {
      factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] = new toBuild(cursorScreenX, cursorScreenY, factorys[currentFactory])
    }
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
            closeUi()
          }
          break
        case 1:
          //MOVE BUTTON
          if (mode == "none") {
            mode = "move"
          } else {
            closeUi()
          }
          break
        case 2:
          //ROTATE BUTTON
          if (mode == "none") {
            mode = "rotate"
          } else {
            closeUi()
          }
          break
      }
    }
  })
}

var toBuild = 0
var moveFromX = 0
var moveFromY = 0
var moveFromCX = -1
var moveFromCY = -1

function buildEvents() {
  $('img').click(function() {
    var id = $(this).attr("id");
    if (id.startsWith("build_")) {
      id = parseInt(id.substr(6))
      toBuild = tileClasses[id]
      mode = "build"
      $('#buildselect').fadeOut(200)
    }
  })
  $('#screen').click(function() {
    if (mode == "rotate") {
      if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] != 0) {
        factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].rotate()
      }
    }
    if (mode == "move") {
      if (isCursorInScreen) {
        if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] != 0) {
          moveFromCX = cursorScreenX
          moveFromCY = cursorScreenY
        } else if (moveFromCX != -1) {
          if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] == 0) {
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] = factorys[currentFactory].tiles[moveFromCX][moveFromCY]
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].x = cursorScreenX
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].y = cursorScreenY
            while (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].input.items.length > 0)
              var item = factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].input.items.pop()
            factorys[currentFactory].tiles[moveFromCX][moveFromCY] = 0
          } else {
            moveFromCX = cursorScreenX
            moveFromCY = cursorScreenY
          }
          moveFromCX = -1
          moveFromCY = -1
        }
      }
    }
    if (mode == "build") {
      if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] == 0) {
        factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] = new toBuild(cursorScreenX, cursorScreenY, factorys[currentFactory])
      }
    }
    if ((mode == "none") && isCursorInScreen) {
      if (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] != 0) {
        selectedTile = factorys[currentFactory].tiles[cursorScreenX][cursorScreenY]
      } else {
        selectedTile = 0
      }
    } else if (mode != "build") {
      selectedTile = 0
    }
  })

  $('img').hover(
    function() {
      //ENTER
      var id = $(this).attr("id");
      if (id.startsWith("build_")) {
        id = parseInt(id.substr(6))
        selectedTile = new tileClasses[id]()
      }
    },
    function() {
      //LEAVE
      selectedTile = 0
    }
  );


  $('body').mousedown(function(e) {
    if (e.which == 1)
      mousedown = true
    if (mode == "move") {
      if (isCursorInScreen) {
        moveFromX = cursorScreenX
        moveFromY = cursorScreenY
      }
    }
  })

  $('body').mouseup(function(e) {
    if (e.which == 1)
      mousedown = false
    if (mode == "move") {
      if (isCursorInScreen && moveFromX != -1) {
        if (moveFromX != cursorScreenX || moveFromY != cursorScreenY) {
          if (factorys[currentFactory].tiles[moveFromX][moveFromY] != 0 && factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] == 0) {
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY] = factorys[currentFactory].tiles[moveFromX][moveFromY]
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].x = cursorScreenX
            factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].y = cursorScreenY
            while (factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].input.items.length > 0)
              var item = factorys[currentFactory].tiles[cursorScreenX][cursorScreenY].input.items.pop()
            factorys[currentFactory].tiles[moveFromX][moveFromY] = 0
          }
          moveFromX = -1
          moveFromY = -1

        }
      }
    }
  })

  $('body').on("contextmenu", function() {
    closeUi()
  })
}

function closeUi() {
  selectedTile = 0
  if (mode == "build") {
    mode = "none"
    toBuild = 0
    return false
  }
  if (mode == "selectbuilding") {
    mode = "none"
    $('#buildselect').fadeOut(200)
    return false
  }
  if (mode == "move") {
    mode = "none"
    return false
  }
  if (mode == "rotate") {
    mode = "none"
    return false
  }
  if (mode == "delete") {
    mode = "none"
    return false
  }
}

var itemId = []
var itemCount = []

function drawInventory(inventory, title) {
  if (!(inventory instanceof Inventory))
    return false;
  itemId = []
  itemCount = []

  for (let item of inventory.items) {
    var id = item.id
    var index = itemId.indexOf(item.id)
    if (index == -1) {
      itemId.push(id)
      itemCount.push(1)
    } else {
      itemCount[index]++
    }
  }

  inventoryCtx.clearRect(0, 0, innerWidth, innerHeight)
  inventoryCtx.font = "20px Electrolize"
  inventoryCtx.fillStyle = "#a3a3a3"
  inventoryCtx.fillRect(0, 0, 15 * 48, 24);
  inventoryCtx.fillStyle = "black"
  inventoryCtx.fillText(lang.inventory + " - " + title, 2, 18)
  inventoryCtx.fillStyle = "black"
  inventoryCtx.textAlign = "end"
  inventoryCtx.fillText(lang.more, 48 * 15 - 2, 18)
  inventoryCtx.textAlign = "start"
  inventoryCtx.font = "16px Electrolize"
  var currentIndex = 0
  if (currentIndex == itemId.length)
    return true
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 10; x++) {
      var img = new Image
      img.src = "images/items/" + items[itemId[currentIndex]].name + ".png"
      inventoryCtx.drawImage(img, 12 + x * 72, 36 + y * 72, 48, 48)

      var formattedCount = formatCount(itemCount[currentIndex])
      inventoryCtx.strokeStyle = "black"
      inventoryCtx.lineWidth = 2
      inventoryCtx.strokeText("x" + formattedCount, 4 + x * 72, 91 + y * 72)
      inventoryCtx.fillStyle = "white"
      inventoryCtx.fillText("x" + formattedCount, 4 + x * 72, 91 + y * 72)

      currentIndex++
      if (currentIndex == itemId.length)
        return true
    }
  }
}
