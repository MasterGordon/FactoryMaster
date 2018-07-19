var version = "Indev 1.0"

var factorysToBuy = 0
var factoryPrice = 50000
var factoryRerollPrice = 2

var factorys = []
var inventory = {}
var teleporter = {}
var money = 100

var items = []

var time = 0
var gametime = 0
var timestep = 1000 / 48
var delta = 0
var lastFrameTimeMs = 0
var ctx = {}
var infoCtx = {}
var inventoryCtx = {}
var currentFactory = 0
var fulltime = 0
var selectItemCallback = 0
var selectedItemId = 0

var lang = {}

var mode = "none"

var renderItems = true

var playername = "Player"
var lastsave = 0
var saving = false

$(document).ready(function () {
    $("#forcesave").click(function () {
        save()
    })
    $("#logout").click(function () {
        $.get("php/logout.php", function (data) {
            window.location.replace("index.html")
        })
    })
    $.get("php/playerdata.php", function (data) {
        try {
            if (JSON.parse(data).status == "nologin")
                window.location.replace("index.html")
        } catch (err) {
            mode = "help"
            $('#help').fadeIn(200)
        }
    })
    loadGameData()
    loadItems()
    loadLang()
    prepairRender()
    requestAnimationFrame(loop)
    if (window.location.hostname == "localhost")
        noPay = true
    $('#loading').hide()
    $('#all').show()
})

var game = 0

$(window).on("beforeunload", function () {
    //save()
})

function save() {
    console.log("saving...")
    game = {}
    game.money = money
    game.gametime = gametime
    game.factorysToBuy = factorysToBuy
    game.factoryRerollPrice = factoryRerollPrice
    game.factoryPrice = factoryPrice
    game.inventory = {}
    game.inventory.itemcount = inventory.itemcount
    game.inventory.items = inventory.items
    game.factorys = []
    for (var i = 0; i < factorys.length; i++) {
        game.factorys.push({})
        game.factorys[i].tier = factorys[i].tier
        game.factorys[i].tiles = []
        for (var x = 0; x < 25; x++) {
            game.factorys[i].tiles[x] = []
            for (var y = 0; y < 12; y++) {
                game.factorys[i].tiles[x][y] = 0
            }
        }
        for (var x = 0; x < 25; x++) {
            for (var y = 0; y < 12; y++) {
                if (factorys[i].tiles[x][y] != 0) {
                    game.factorys[i].tiles[x][y] = {}
                    game.factorys[i].tiles[x][y].i = factorys[i].tiles[x][y].i
                    game.factorys[i].tiles[x][y].d = directions[factorys[i].tiles[x][y].direction].d
                    game.factorys[i].tiles[x][y].x = factorys[i].tiles[x][y].x
                    game.factorys[i].tiles[x][y].y = factorys[i].tiles[x][y].y
                    if (factorys[i].tiles[x][y].options != undefined) {
                        for (var o = 0; o < factorys[i].tiles[x][y].options.length; o++) {
                            var val = factorys[i].tiles[x][y].options[o].var
                            game.factorys[i].tiles[x][y][val] = factorys[i].tiles[x][y][val]
                        }
                    }
                }
            }
        }
    }
    Cookies.set("game", JSON.stringify(game))
    $.ajax({
        url: 'php/savegame.php',
        type: 'POST',
        data: {
            gamedata: JSON.stringify(game),
            "gametime": gametime
        },
        success: function (result) {
            console.log(result)
            if (JSON.parse(result).status == "succes") {
                lastsave = new Date().getTime()
                saving = false
            }
        }
    });
}

function loadGameData() {
    lastsave = new Date().getTime()
    //Keine Save Vorhanden
    factorys.push(new Factory())
    inventory = new FactoryInventory()
    //game = Cookies.get("game")
    $.get("php/playerdata.php", function (data) {
        if (JSON.parse(data).money != undefined) {
            game = JSON.parse(data)
        } else {
            game = 0
        }
        if (game != 0) {
            //game = JSON.parse(game)
            console.log("Loading Game")
            money = game.money
            gametime = game.gametime
            factorysToBuy = game.factorysToBuy
            factoryRerollPrice = game.factoryRerollPrice
            factoryPrice = game.factoryPrice
            inventory = new FactoryInventory()
            factorys = []
            inventory.itemcount = game.inventory.itemcount
            inventory.items = game.inventory.items
            for (var i = 0; i < game.factorys.length; i++) {
                factorys.push(new Factory(game.factorys[i].tier))
                for (var x = 0; x < 25; x++) {
                    for (var y = 0; y < 12; y++) {
                        if (game.factorys[i].tiles[x][y] != 0) {
                            var keys = Object.keys(game.factorys[i].tiles[x][y])
                            factorys[i].tiles[x][y] = new tileClasses[game.factorys[i].tiles[x][y].i](game.factorys[i].tiles[x][y].x, game.factorys[i].tiles[x][y].y)
                            factorys[i].tiles[x][y].factory = factorys[i]
                            for (var key = 0; key < keys.length; key++) {
                                if (keys[key] == "d")
                                    factorys[i].tiles[x][y].direction = d[game.factorys[i].tiles[x][y]["d"]]
                                else
                                    factorys[i].tiles[x][y][keys[key]] = game.factorys[i].tiles[x][y][keys[key]]
                            }
                        }
                    }
                }
            }
        }
    });
}

function loadItems() {
    var itemRequest = new XMLHttpRequest();
    itemRequest.open('GET', 'js/items.json', false)
    itemRequest.send(null)
    var json = JSON.parse(itemRequest.responseText)
    items = json.items
    minerals = json.minerals
    for (var i = 0; i < items.length; i++) {
        var image = new Image
        image.src = "images/items/" + items[i].name + ".png"
        items[i].img = image
    }
}

function loadLang() {
    var langCode = "en"
    var langRequest = new XMLHttpRequest();
    langRequest.open('GET', 'lang/' + langCode + '.json', false)
    langRequest.send(null)
    var json = JSON.parse(langRequest.responseText)
    lang = json
}

function loop(timestamp) {
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

function loopp(timestamp) {
    var progress = timestamp - lastRender

    gametick(progress)
    render()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var tick = []

function gametick(timestep) {
    //time gibt an in den Wievielten von 40 Ticks man sich befindet
    time++
    gametime++
    time = time % 48
    //Wird 40 mal in einer Sekunde aufgerufen
    for (var i = 0; i < factorys.length; i++) {
        factorys[i].moveItems()
        factorys[i].workTiles()
        factorys[i].despawnOldItems()
    }
    tick.push(new Date().getTime())
    if (tick.length > 48) {
        tick = tick.splice(1)
        $("#speed").html("Game Speed: " + ((tick[47] - tick[0] + 30) / 10) + "%<br>" + version)
    }
    if (!saving && Math.round((new Date().getTime() - lastsave) / 60000) > 5 && lastsave != 0) {
        saving = true
        save()
    }
}

var rotationOverlay = new Image
rotationOverlay.src = "images/ui/rotationOverlay.png"

function render() {
    fulltime++
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    var tilesToRender = factorys[currentFactory].getTiles()
    //Hier wird das Spiel gerendert
    //RENDER TILE-LAYER0
    for (var i = 0; i < tilesToRender.length; i++) {
        var tile = tilesToRender[i]
        var img = tile.getImage(fulltime, 0)
        if (img != "0") {
            drawRotatedImage(img, tile.x * 48 + 24, tile.y * 48 + 24, directions[tile.direction].degree)
        }
    }
    //RENDER Items
    if (renderItems)
        for (var i = 0; i < factorys[currentFactory].items.length; i++) {
            var item = factorys[currentFactory].items[i]
            //  var img = new Image
            //  img.src = "images/items/" + getItemFormId(item.id).name + ".png"
            if (item.dx != 0 || item.dy != 0)
                ctx.drawImage(items[item.id].img, item.x, item.y, 48, 48)
            else if (factorys[currentFactory].tiles[item.x / 48][item.y / 48] == 0)
                ctx.drawImage(items[item.id].img, item.x, item.y, 48, 48)

        }
    //RENDER TILE-LAYER1
    for (var i = 0; i < tilesToRender.length; i++) {
        var tile = tilesToRender[i]
        var img = tile.getImage(fulltime, 1)
        if (img != "0") {
            drawRotatedImage(img, tile.x * 48 + 24, tile.y * 48 + 24, directions[tile.direction].degree)
        }
        if (mode == "rotate") {
            ctx.globalAlpha = 0.4
            drawRotatedImage(rotationOverlay, tile.x * 48 + 24, tile.y * 48 + 24, directions[tile.direction].degree)
            ctx.globalAlpha = 1
        }
    }
    //DRAW CURSOR BOX
    if (isCursorInScreen) {
        if (mode == "build") {
            ctx.globalAlpha = 0.6
            var tile = new toBuild()
            tile.direction = buildRotation
            var img = tile.getImage(fulltime, 0)
            if (img != "0") {
                drawRotatedImage(img, cursorScreenX * 48 + 24, cursorScreenY * 48 + 24, directions[tile.direction].degree)
            }
            img = tile.getImage(fulltime, 1)
            if (img != "0") {
                drawRotatedImage(img, cursorScreenX * 48 + 24, cursorScreenY * 48 + 24, directions[tile.direction].degree)
            }
            ctx.globalAlpha = 0.2
            drawRotatedImage(rotationOverlay, cursorScreenX * 48 + 24, cursorScreenY * 48 + 24, directions[tile.direction].degree)
            ctx.globalAlpha = 1
        } else {
            ctx.globalAlpha = 0.4
            if (mode == "delete") {
                ctx.fillStyle = "#FF0000";
                if (deleteFromX != -1) {
                    var lowerX = 0
                    var deltaX = 0
                    if (deleteFromX < cursorScreenX) {
                        lowerX = deleteFromX
                        deltaX = cursorScreenX - deleteFromX + 1
                    } else {
                        lowerX = cursorScreenX
                        deltaX = deleteFromX - cursorScreenX + 1
                    }
                    var lowerY = 0
                    var deltaY = 0
                    if (deleteFromY < cursorScreenY) {
                        lowerY = deleteFromY
                        deltaY = cursorScreenY - deleteFromY + 1
                    } else {
                        lowerY = cursorScreenY
                        deltaY = deleteFromY - cursorScreenY + 1
                    }
                    ctx.fillRect(lowerX * 48, lowerY * 48, deltaX * 48, deltaY * 48)
                }
            } else {
                ctx.fillStyle = "black";
            }
            if (deleteFromX == -1)
                ctx.fillRect(cursorScreenX * 48, cursorScreenY * 48, 48, 48)
            ctx.globalAlpha = 1
        }
    }
    //DRAW INFO BAR
    if (selectedTile == undefined)
        selectedTile = 0
    drawInfoBar()
    if (selectedTile != 0 && mode != "selectbuilding" && mode != "build") {
        if (selectedTile.hasNoInventory === undefined)
            drawInventory(selectedTile.input, lang.tiles[selectedTile.name].name)
        else
            drawInventory(inventory, lang["player"])
    } else {
        drawInventory(inventory, lang["player"])
    }
    $('#money').text(formatCount(money) + " " + lang.money)
    if (mode == "showmore") {
        drawBigInventory(inventory)
    }
    $('#lastsave').text("last save " + Math.round((new Date().getTime() - lastsave) / 60000) + "min ago")
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
    inventoryCtx = canvas.getContext('2d')
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
    console.log("Loading Oretiers")
    for (var i = 1; i < 9; i++) {
        $('#oretiers').append("<h1>" + lang.depth + " " + i + ":</h1>");
        for (var j = 0; j < minerals.nameFromId.length; j++) {
            if (minerals[minerals.nameFromId[j]].depth == i) {
                $('#oretiers').append("<h2>" + lang.minerals[j] + "</h2>");
            }
        }

        $('#oretiers').append("<br>");
    }
    $('#buildselect').hide()
    $('#oretiers').hide()
    $('#help').hide()
    $('#inventoryBig').hide()
    $('#selectItem').hide()
    $('#options').hide()
    $('#selectFactory').hide()
    for (var i = 0; i < items.length; i++) {
        var tag = '<img id="itemSel_' + i + '" draggable="false" class="buildtile itemhover" src="images/items/' + items[i].name + '.png">'
        $('#selectItem').append(tag)
        $('#itemSel_' + i).click(function () {
            var id = $(this).attr("id");
            id = parseInt(id.substr(8))
            selectedItemId = id
            selectedTile[selectItemVal] = selectedItemId
            mode = "none"
            $('#selectItem').fadeOut(200)
            options()
        })
    }
    buildEvents()
    //Build Sell/Select Items Menu
    for (var i = 0; i < items.length; i++) {
        $('#itemsScroll').append('<canvas class="itemBig itemhover" id="itemBig_' + i + '"></canvas>')
        $('#itemBig_' + i)[0].width = 72
        $('#itemBig_' + i)[0].height = 72
    }
    $('.itemhover').hover(
            function () {
                //ENTER
                var id = $(this).attr("id");
                if (id != undefined)
                    if (id.startsWith("itemBig_") || id.startsWith("itemSel_")) {
                        id = parseInt(id.substr(8))
                        if ($(this).attr("id").startsWith("itemBig_"))
                            if (id < itemId.length) {
                                id = itemId[id]
                            } else
                                return
                        hoverTooltip = true
                        $('#tooltip').text(lang.items[id] + " (" + formatCount(items[id].value) + " " + lang.money + ")")
                        $('#tooltip').show()
                        tooltip = true
                    }
            },
            function () {
                //LEAVE
                hoverTooltip = false
            }
    );
    $('canvas').click(
            function () {
                var id = $(this).attr("id");
                if (id != undefined)
                    if (id.startsWith("itemBig_")) {
                        id = parseInt(id.substr(8))
                        if (id < itemId.length) {
                            var idd = itemId[id]
                            if (inventory.take(itemId[id], 1)) {
                                money += items[idd].value
                            }
                        }
                    }
            })
    //End Sell/Select Items Menu
    $('#clickToSell').text(lang.clickToSell)
    for (var i = 0; i < infoBarIcons.length; i++) {
        if (infoBarIcons[i] != null) {
            var img = new Image
            img.src = "images/ui/" + infoBarIcons[i]
            infoBarIconsImg.push(img)
        } else {
            infoBarIconsImg.push(null)
        }
    }
}

var infoBarIcons = ["build.png", "move.png", "rotate.png", "delete.png", null, "help.png", "info.png", null, "factorys.png"]
var infoBarIconsImg = []

var infoGlowOpacity = 0
var infoGlowOpacityD = 0.03
var selectedTile = 0

function drawInfoBar() {
    infoCtx.clearRect(0, 0, innerWidth, innerHeight)
    var selectedX = -1;
    if (mode == "build" || mode == "selectbuilding") {
        selectedX = 0
    } else if (mode == "move") {
        selectedX = 1
    } else if (mode == "rotate") {
        selectedX = 2
    } else if (mode == "delete") {
        selectedX = 3
    } else if (mode == "selectFactory") {
        selectedX = 8
    }else if (mode == "help") {
        selectedX = 5
    }else if (mode == "oretiers") {
        selectedX = 6
    }

    if (selectedX != -1) {
        infoCtx.globalAlpha = infoGlowOpacity + 0.25
        infoCtx.beginPath();
        infoCtx.arc(selectedX * 48 + 24, 24, 24, 0, 2 * Math.PI);
        infoCtx.fillStyle = "orange"
        infoCtx.fill()
        if (infoGlowOpacity < 0) {
            infoGlowOpacityD = +0.02
        }
        if (infoGlowOpacity > 0.45) {
            infoGlowOpacityD = -0.02
        }
        infoGlowOpacity += infoGlowOpacityD
        infoCtx.globalAlpha = 1
    }
    for (var i = 0; i < infoBarIconsImg.length; i++) {
        if (infoBarIconsImg[i] != null) {
            infoCtx.drawImage(infoBarIconsImg[i], i * 48, 0, 48, 48);
        }
    }
    if (toBuild != 0) {
        selectedTile = new toBuild()
    }
    if (selectedTile != 0) {
        $('#infoDesc h1').text(lang.tiles[selectedTile.name].name)
        if (selectedTile.maxwork != 0)
            $('#infoDesc p').text((selectedTile.maxwork / 48) + " Sec | " + lang.tiles[selectedTile.name].description)
        else
            $('#infoDesc p').text(lang.tiles[selectedTile.name].description)
    } else {
        $('#infoDesc h1').text("Factory " + currentFactory)
        $('#infoDesc p').html("<br>" + lang.mineralslable + "<br><br> - " + lang.minerals[factorys[currentFactory].ores[0]] + "<br> - " + lang.minerals[factorys[currentFactory].ores[1]] + "<br> - " + lang.minerals[factorys[currentFactory].ores[2]] + "<br> - " + lang.minerals[factorys[currentFactory].ores[3]])
    }
    if (selectedTile.maxwork != 0 && mode != "selectbuilding" && mode != "building") {
        $('#infoDesc p').css("height", 154)
        infoCtx.fillStyle = "green";
        infoCtx.fillRect(0, 228, 432 * (selectedTile.currentwork / selectedTile.maxwork), 12)
    } else {
        $('#infoDesc p').css("height", 166)
    }
    if (mode == "selectbuilding" || mode == "build") {
        if (selectedTile != 0) {
            infoCtx.textAlign = "center"
            infoCtx.font = "18px Electrolize"
            infoCtx.fillStyle = "black";
            infoCtx.fillText(lang.cost, 336, 66)
            infoCtx.textAlign = "start"
            for (var i = 0; i < selectedTile.cost.length; i++) {
                if (selectedTile.cost[i].id == 0)
                    infoCtx.fillText(selectedTile.cost[i].count + " " + lang.money, 246, 86 + 20 * i)
                else
                    infoCtx.fillText(selectedTile.cost[i].count + "x " + lang.items[selectedTile.cost[i].id], 246, 86 + 20 * i)
            }
        }
    }
}
