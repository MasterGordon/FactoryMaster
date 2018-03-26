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

  take(id, count) {
    if (this.countOf(id) >= count) {
      for (var j = 0; j < count; j++) {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].id == id) {
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

class Factory {
  constructor(tier) {
    this.tier = tier
    this.tiles = []
    this.items = []
    for (var x = 0; x < 32; x++) {
      this.tiles[x] = []
      for (var y = 0; y < 16; y++) {
        this.tiles[x][y] = 0
      }
    }
  }

  moveItems() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].move()
      if (this.items[i].x % 48 == 0 && this.items[i].y % 48 == 0) {
        var tile = this.tiles[this.items[i].x / 48][this.items[i].y / 48]
        if (tile != 0) {
          tile.input.addItem(this.items[i])
        }
      }
    }
  }

  getTiles() {
    var temp = []
    for (var x = 0; x < 32; x++) {
      for (var y = 0; y < 16; y++) {
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
    for (var x = 0; x < 32; x++) {
      for (var y = 0; y < 16; y++) {
        if (this.tiles[x][y] != 0) {
          this.tiles[x][y].work()
        }
      }
    }
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item), 1)
  }

}
