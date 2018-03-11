class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.direction = "right"
    this.input = new Inventory()
  }

  work() {
    //Default Conveyor-Belt Verhalten
    while (this.input.items.length > 1) {
      var item = this.input.items.pop()
      item.setDFromDirection(this.direction)
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
  }

  setDFromDirection(direction) {
    if (direction == "left") {
      this.dx = -1
      this.dy = 0
    } else if (direction == "right") {
      this.dx = 1
      this.dy = 0
    } else if (direction == "up") {
      this.dx = 0
      this.dy = -1
    } else if (direction == "down") {
      this.dx = 0
      this.dy = 1
    } else {
      this.dx = 0
      this.dy = 0
    }
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
        var tile = this.tiles [this.items[i].x / 48] [this.items[i].y / 48]
        if (tile != 0) {
          tile.input.addItem(this.items[i])
        }
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

}
