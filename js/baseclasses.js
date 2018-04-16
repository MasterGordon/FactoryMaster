var noPay = false
class Tile {
  constructor(x, y, factory) {
    this.x = x
    this.y = y
    this.direction = "right"
    this.input = new Inventory()
    this.name = "base"
    this.factory = factory
    this.currentwork = 0
    this.maxwork = 0
    this.texture = {
      "0": [],
      "1": []
    }
    this.images = {
      "0": [],
      "1": []
    }
  }

  loadImages() {
    if (this.texture["0"].length > 0) {
      for (var i = 0; i < this.texture["0"].length; i++) {
        var img = new Image
        img.src = "images/tiles/" + this.texture["0"][i] + ".png"
        this.images["0"].push(img)
      }
    }
    if (this.texture["1"].length > 0) {
      for (var i = 0; i < this.texture["1"].length; i++) {
        var img = new Image
        img.src = "images/tiles/" + this.texture["1"][i] + ".png"
        this.images["1"].push(img)
      }
    }
  }

  pay() {
    if (noPay)
      return true
    var items = 0
    for (var i = 0; i < this.cost.length; i++) {
      if (this.cost[i].id == 0) {
        if (this.cost[i].count <= money) {
          items++
        }
      } else {
        if (inventory.countOf(this.cost[i].id) >= this.cost[i].count) {
          items++
        }
      }
    }
    if (items == this.cost.length) {
      for (var i = 0; i < this.cost.length; i++) {
        if (this.cost[i].id == 0) {
          money -= this.cost[i].count
        } else {
          inventory.take(this.cost[i].id, this.cost[i].count, null)
        }
      }
      return true
    }
    return false
  }

  unloadImages() {
    this.images = {
      "0": [],
      "1": []
    }
  }

  getImage(fulltime, layer) {
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Default Conveyor-Belt Verhalten
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      item.setDFromDirection(this.direction)
    }
  }

  rotate() {
    switch (this.direction) {
      case "right":
        this.direction = "down"
        break;
      case "down":
        this.direction = "left"
        break;
      case "left":
        this.direction = "up"
        break;
      case "up":
        this.direction = "right"
        break;
    }
  }
}


class Inventory {
  constructor() {
    this.items = []
  }

  countOf(id) {
    var n = 0
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id)
        n++
    }
    return n
  }

  addItem(item) {
    if (item instanceof Item)
      this.items.push(item)
  }

  take(id, count, factory) {
    if (this.countOf(id) >= count) {
      for (var j = 0; j < count; j++) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].id == id) {
            if (factory != null)
              factory.deleteItem(this.items[i])
            this.items.splice(i, 1)
            break;
          }
        }
      }
      return true
    }
    return false
  }
}

class Item {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.dx = 0
    this.dy = 0
    this.spawntime = new Date().getTime()
  }

  setDFromDirection(direction) {
    this.dx = directions[direction].dx
    this.dy = directions[direction].dy
    this.x += this.dx
    this.y += this.dy
  }

  move() {
    this.x += this.dx
    this.y += this.dy
    if (this.x % 48 == 0 && this.y % 48 == 0) {
      this.dx = 0
      this.dy = 0
    }
  }
}

var bodenvorkommen = ["bauxite", //0
  "beryllium", //1
  "lead", //2
  "chrome", //3
  "diamonds", //4
  "iron", //5
  "naturalgas", //6
  "oil", //7
  "gold", //8
  "kaolin", //9
  "cobalt", //10
  "coal", //11
  "copper", //12
  "lithium", //13
  "magnesium", //14
  "manganese", //15
  "molybdenum", //16
  "nickel", //17
  "phosphate", //18
  "platinum", //19
  "potash", //20
  "rubies", //21
  "silver", //22
  "soda", //23
  "tantalum", //24
  "titanium", //25
  "uranium", //26
  "vanadium", //27
  "tungsten", //28
  "zinc", //29
  "tin", //30
  "salt" //31
]

class Factory {
  constructor(tier) {
    this.ores = []
    this.tier = tier
    if (this.tier == undefined)
      this.tier = 0
    if (this.tier == 0) {
      this.ores.push(5)
      this.ores.push(11)
      this.ores.push(12)
      this.ores.push(23)
    } else {
      var myrng = new Math.seedrandom(this.tier);
      this.ores.push(Math.abs(myrng.int32()) % bodenvorkommen.length)
      this.ores.push(Math.abs(myrng.int32()) % bodenvorkommen.length)
      this.ores.push(Math.abs(myrng.int32()) % bodenvorkommen.length)
      this.ores.push(Math.abs(myrng.int32()) % bodenvorkommen.length)
    }
    this.tiles = []
    this.items = []
    for (var x = 0; x < 25; x++) {
      this.tiles[x] = []
      for (var y = 0; y < 12; y++) {
        this.tiles[x][y] = 0
      }
    }
  }

  moveItems() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].move()
      if (this.items[i].x < 0 || this.items[i].x >= 1200 || this.items[i].y < 0 || this.items[i].y >= 576) {
        console.log("removed Item")
        this.deleteItem(this.items[i])
      } else {
        if (this.items[i].x % 48 == 0 && this.items[i].y % 48 == 0) {
          var tile = this.tiles[this.items[i].x / 48][this.items[i].y / 48]
          if (tile != 0) {
            if (tile.input.items.indexOf(this.items[i]) == -1)
              tile.input.addItem(this.items[i])
          }
        }
      }
    }
  }

  unloadImages() {
    for (var x = 0; x < 25; x++) {
      for (var y = 0; y < 12; y++) {
        if (this.tiles[x][y] != 0) {
          this.tiles[x][y].unloadImages()
        }
      }
    }
  }

  loadImages() {
    for (var x = 0; x < 25; x++) {
      for (var y = 0; y < 12; y++) {
        if (this.tiles[x][y] != 0) {
          this.tiles[x][y].loadImages()
        }
      }
    }
  }

  getTiles() {
    var temp = []
    for (var x = 0; x < 25; x++) {
      for (var y = 0; y < 12; y++) {
        if (this.tiles[x][y] != 0) {
          temp.push(this.tiles[x][y])
        }
      }
    }
    return temp
  }

  despawnOldItems() {
    var time = new Date().getTime()
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].spawntime + 1000 * 60 * 5 < time) {
        this.items.splice(i, 1)
      }
    }
  }

  workTiles() {
    for (var x = 0; x < 25; x++) {
      for (var y = 0; y < 12; y++) {
        if (this.tiles[x][y] != 0) {
          this.tiles[x][y].work()
        }
      }
    }
  }

  deleteItem(item) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].x == item.x && this.items[i].y == item.y && this.items[i].id == item.id) {
        this.items.splice(i, 1)
        return
      }
    }
  }

}
