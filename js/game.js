var factorys = []

var items = []

var time = 0
var timestep = 1000 / 48
var delta = 0
var lastFrameTimeMs = 0
var ctx = {}
var infoCtx = {}
var currentFactory = 0
var fulltime = 0

var mode = "none"

$(document).ready(function() {
  loadGameData()
  loadItems()
  prepairRender()
  requestAnimationFrame(loop)
})

function loadGameData() {
  //TODO: Check for Cookies
  factorys.push(new Factory())
}

function loadItems() {
  var itemRequest = new XMLHttpRequest();
  itemRequest.open('GET', 'js/items.json', false)
  itemRequest.send(null)
  var json = JSON.parse(itemRequest.responseText)
  items = json.items
}

function loopp(timestamp) {
  //Check Gametick Rate
  if (timestamp < lastFrameTimeMs + (1000 / 48)) {
    requestAnimationFrame(loop)
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  var numUpdateSteps = 0
  while (delta >= timestep) {
    gametick(timestep)
    delta -= timestep
    if (++numUpdateSteps >= 240) {
      delta = 0
      break;
    }
  }
  render();
  requestAnimationFrame(loop);
}

var lastRender = 0

function loop(timestamp) {
  var progress = timestamp - lastRender

  gametick(progress)
  render()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

function gametick(timestep) {
  //time gibt an in den Wievielten von 40 Ticks man sich befindet
  time++
  time = time % 48
  //Wird 40 mal in einer Sekunde aufgerufen
  for (var i = 0; i < factorys.length; i++) {
    factorys[i].moveItems()
  }

  if (time % 24 == 0) {
    for (var i = 0; i < factorys.length; i++) {
      factorys[i].moveItems()
      factorys[i].workTiles()
    }
  }
}

function render() {
  fulltime++
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  var tilesToRender = factorys[currentFactory].getTiles()
  //Hier wird das Spiel gerendert
  //RENDER TILE-LAYER0
  for (var i = 0; i < tilesToRender.length; i++) {
    var tile = tilesToRender[i]
    var img = new Image
    var tmp = tile.getTexture(fulltime, 0)
    if (tmp != "0") {
      img.src = tmp
      drawRotatedImage(img, tile.x * 48 + 24, tile.y * 48 + 24, directions[tile.direction].degree)
    }
  }
  //RENDER Items
  for (var i = 0; i < factorys[currentFactory].items.length; i++) {
    var item = factorys[currentFactory].items[i]
    var img = new Image
    img.src = "images/items/" + getItemFormId(item.id).name + ".png"
    ctx.drawImage(img, item.x, item.y, 48, 48)
    console.log(item.x)
  }
  //RENDER TILE-LAYER1
  for (var i = 0; i < tilesToRender.length; i++) {
    var tile = tilesToRender[i]
    var img = new Image
    var tmp = tile.getTexture(fulltime, 1)
    if (tmp != "0") {
      img.src = tmp
      drawRotatedImage(img, tile.x * 48 + 24, tile.y * 48 + 24, directions[tile.direction].degree)
    }
  }
  //DRAW CURSOR BOX
  if (isCursorInScreen) {
    if (mode == "build") {
      ctx.globalAlpha = 0.6
      var tile = new toBuild()
      var img = new Image
      var tmp = tile.getTexture(fulltime, 0)
      if (tmp != "0") {
        img.src = tmp
        drawRotatedImage(img, cursorScreenX * 48 + 24, cursorScreenY * 48 + 24, 0)
      }
      img = new Image
      tmp = tile.getTexture(fulltime, 1)
      if (tmp != "0") {
        img.src = tmp
        drawRotatedImage(img, cursorScreenX * 48 + 24, cursorScreenY * 48 + 24, 0)
      }
      ctx.globalAlpha = 1
    } else {
      ctx.globalAlpha = 0.4
      ctx.fillRect(cursorScreenX * 48, cursorScreenY * 48, 48, 48)
      ctx.globalAlpha = 1
    }
  }
  //DRAW INFO BAR
  drawInfoBar()
}

function getItemFormId(id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      return items[i]
    }
  }
}

function prepairRender() {
  var canvas = $('#screen')[0];
  ctx = canvas.getContext('2d')
  canvas.width = 1200
  canvas.height = 576
  canvas = $('#itemcount')[0];
  canvas.width = 720
  canvas.height = 240
  canvas = $('#info')[0];
  canvas.width = 432
  canvas.height = 240
  infoCtx = canvas.getContext('2d')
  //tileClasses
  var tilesLoaded = 0
  console.log("Building Tileselection-Menu...")
  for (var i = 0; i < tileClasses.length; i++) {
    var tmp = new tileClasses[i]()
    var src = ""
    if (tmp.texture[1].length > 0) {
      src = ' src="images/tiles/' + tmp.texture[1][0] + '.png"'
    }
    var style = ''
    if (tmp.texture[0].length > 0) {
      style = ' style="background-image: url(images/tiles/' + tmp.texture[0][0] + '.png)"'
    }
    var tag = '<img id="build_' + i + '" draggable="false" class="buildtile"' + src + style + '>'
    $('#buildselect').append(tag)
    tilesLoaded++
  }
  console.log(tilesLoaded + "/" + tileClasses.length + " Tiles Loaded!")
  $('#buildselect').hide()
  buildEvents()
}

var infoBarIcons = ["build.png", "move.png", "rotate.png", "delete.png", null, "upgrade.png", "info.png", null, "rocket.png"]

function drawInfoBar() {
  infoCtx.clearRect(0, 0, innerWidth, innerHeight)
  for (var i = 0; i < infoBarIcons.length; i++) {
    if (infoBarIcons[i] != null) {
      var img = new Image;
      img.src = "images/ui/" + infoBarIcons[i];
      infoCtx.drawImage(img, i * 48, 0, 48, 48);
    }
  }
}
