var tileClasses = []

//Hier sind alle im Tiles welche im Spiel präsent sind

class Conveyorbelt extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "conveyorbelt"
    this.hasNoInventory = true
    this.i = 0
    this.cost = [{
      "id": 0,
      "count": 20
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": []
    }
    this.loadImages()
  }
}

class Treefarm extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 5
    this.currentwork = 0
    this.name = "treefarm"
    this.i = 1
    this.hasNoInventory = true
    this.cost = [{
      "id": 0,
      "count": 30
    }]
    this.texture = {
      "0": [],
      "1": ["treefarm10", "treefarm10", "treefarm10", "treefarm11", "treefarm11", "treefarm11", "treefarm12", "treefarm12", "treefarm12", "treefarm13", "treefarm13", "treefarm13", "treefarm14", "treefarm14", "treefarm14", "treefarm15", "treefarm15", "treefarm15"]
    }
    this.loadImages()
  }

  work() {
    this.currentwork = ((this.currentwork + 1) % this.maxwork)
    if (this.currentwork == 0) {
      var item = new Item(1, this.x * 48, this.y * 48)
      this.factory.items.push(item)
      item.setDFromDirection(this.direction)
    }
  }
}

class Saw extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48
    this.currentwork = 0
    this.name = "saw"
    this.i = 2
    this.cost = [{
        "id": 0,
        "count": 750
      },
      {
        "id": 1,
        "count": 50
      }
    ]
    this.texture = {
      "0": [],
      "1": ["saw10", "saw10", "saw10", "saw10", "saw11", "saw11", "saw11", "saw11", "saw12", "saw12", "saw12", "saw12", "saw13", "saw13", "saw13", "saw13"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    var requieredCount = 5
    if (this.input.countOf(1) >= requieredCount || this.input.countOf(2) >= 1) {
      if (this.currentwork == this.maxwork) {
        if (this.input.countOf(1) >= requieredCount) {
          this.input.take(1, requieredCount, this.factory)
          for (var i = 0; i < 4; i++) {
            var item = new Item(2, this.x * 48, this.y * 48)
            this.factory.items.push(item)
            item.setDFromDirection(this.direction)
          }
        } else {
          this.input.take(2, 1, this.factory)
          var item = new Item(5, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class Weaver extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 3
    this.currentwork = 0
    this.name = "weaver"
    this.i = 10
    this.cost = [{
        "id": 2,
        "count": 200
      },
      {
        "id": 3,
        "count": 100
      },
      {
        "id": 0,
        "count": 25000
      }
    ]
    this.texture = {
      "0": [],
      "1": ["weaver10"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    var requieredCount = 5
    if (this.input.countOf(2) >= requieredCount) {
      if (this.currentwork == this.maxwork) {
        this.currentwork = 0
        this.input.take(2, requieredCount, this.factory)
        var item = new Item(9, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
      } else {
        this.currentwork++
      }
    } else if (this.input.countOf(9) >= 1 && this.input.countOf(7) >= 1) {
      if (this.currentwork == this.maxwork) {
        this.currentwork = 0
        this.input.take(9, 1, this.factory)
        this.input.take(7, 1, this.factory)
        var item = new Item(10, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class Papermanufactory extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 10
    this.currentwork = 0
    this.name = "papermanufactory"
    this.i = 11
    this.cost = [{
        "id": 2,
        "count": 200
      },
      {
        "id": 3,
        "count": 500
      },
      {
        "id": 0,
        "count": 10000
      }
    ]
    this.texture = {
      "0": [],
      "1": ["papermanufactory10"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    var requieredCount = 5
    if (this.input.countOf(9) >= 10 && this.input.countOf(5) >= 100) {
      if (this.currentwork == this.maxwork) {
        this.input.take(9, 10, this.factory)
        this.input.take(5, 100, this.factory)
        this.currentwork = 0
        for (var i = 0; i < 10; i++) {
          var item = new Item(7, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class Charcoalmeiler extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "charcoalmeiler"
    this.i = 3
    this.cost = [{
        "id": 0,
        "count": 1000
      },
      {
        "id": 3,
        "count": 30
      }
    ]
    this.texture = {
      "0": [],
      "1": ["charcoalmeiler10", "charcoalmeiler10", "charcoalmeiler10", "charcoalmeiler11", "charcoalmeiler11", "charcoalmeiler11", "charcoalmeiler12", "charcoalmeiler12", "charcoalmeiler12", "charcoalmeiler13", "charcoalmeiler13", "charcoalmeiler13", "charcoalmeiler14", "charcoalmeiler14", "charcoalmeiler14", "charcoalmeiler15", "charcoalmeiler15", "charcoalmeiler15", "charcoalmeiler16", "charcoalmeiler16", "charcoalmeiler16", "charcoalmeiler17", "charcoalmeiler17", "charcoalmeiler17", "charcoalmeiler18", "charcoalmeiler18", "charcoalmeiler18", "charcoalmeiler19", "charcoalmeiler19", "charcoalmeiler19", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler110", "charcoalmeiler111", "charcoalmeiler112", "charcoalmeiler112", "charcoalmeiler112", "charcoalmeiler112", "charcoalmeiler112", "charcoalmeiler113", "charcoalmeiler113", "charcoalmeiler113", "charcoalmeiler113", "charcoalmeiler113", "charcoalmeiler114", "charcoalmeiler114", "charcoalmeiler114", "charcoalmeiler114", "charcoalmeiler114"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 4)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Items für ein Pank
    var requieredCount = 10
    if (this.input.countOf(2) >= requieredCount) {
      if (this.currentwork == this.maxwork) {
        this.input.take(2, requieredCount, this.factory)
        for (var i = 0; i < 5; i++) {
          var item = new Item(4, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class Smith extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "smith"
    this.i = 19
    this.cost = [{
        "id": 0,
        "count": 1000
      },
      {
        "id": 3,
        "count": 30
      }
    ]
    this.texture = {
      "0": [],
      "1": ["smith10", "smith11", "smith12", "smith11"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 7)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    if (this.input.countOf(2) >= 1 && this.input.countOf(33) >= 1) {
      if (this.currentwork == this.maxwork) {
        this.input.take(2, 1, this.factory)
        this.input.take(33, 1, this.factory)
        var item = new Item(35, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class CrucibleFurnace extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "cruciblefurnace"
    this.i = 18
    this.cost = [{
        "id": 0,
        "count": 1000
      },
      {
        "id": 3,
        "count": 30
      }
    ]
    this.texture = {
      "0": [],
      "1": ["cruciblefurnace10", "cruciblefurnace11", "cruciblefurnace12", "cruciblefurnace11"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 4)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Items für ein Pank
    var requieredCount = 10
    if (this.input.countOf(33) >= 35 && this.input.countOf(16) >= 5) {
      if (this.currentwork == this.maxwork) {
        this.input.take(2, requieredCount, this.factory)
        for (var i = 0; i < 40; i++) {
          var item = new Item(32, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class AdvancedCharcoalmeiler extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "advancedcharcoalmeiler"
    this.i = 12
    this.dust = 0
    this.cost = [{
        "id": 0,
        "count": 50000
      },
      {
        "id": 3,
        "count": 1000
      },
      {
        "id": 10,
        "count": 200
      }
    ]
    this.texture = {
      "0": [],
      "1": ["advancedcharcoalmeiler10", "advancedcharcoalmeiler10", "advancedcharcoalmeiler10", "advancedcharcoalmeiler11", "advancedcharcoalmeiler11", "advancedcharcoalmeiler11", "advancedcharcoalmeiler12", "advancedcharcoalmeiler12", "advancedcharcoalmeiler12", "advancedcharcoalmeiler13", "advancedcharcoalmeiler13", "advancedcharcoalmeiler13", "advancedcharcoalmeiler14", "advancedcharcoalmeiler14", "advancedcharcoalmeiler14", "advancedcharcoalmeiler15", "advancedcharcoalmeiler15", "advancedcharcoalmeiler15", "advancedcharcoalmeiler16", "advancedcharcoalmeiler16", "advancedcharcoalmeiler16", "advancedcharcoalmeiler17", "advancedcharcoalmeiler17", "advancedcharcoalmeiler17", "advancedcharcoalmeiler18", "advancedcharcoalmeiler18", "advancedcharcoalmeiler18", "advancedcharcoalmeiler19", "advancedcharcoalmeiler19", "advancedcharcoalmeiler19", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler110", "advancedcharcoalmeiler111", "advancedcharcoalmeiler112", "advancedcharcoalmeiler112", "advancedcharcoalmeiler112", "advancedcharcoalmeiler112", "advancedcharcoalmeiler112", "advancedcharcoalmeiler113", "advancedcharcoalmeiler113", "advancedcharcoalmeiler113", "advancedcharcoalmeiler113", "advancedcharcoalmeiler113", "advancedcharcoalmeiler114", "advancedcharcoalmeiler114", "advancedcharcoalmeiler114", "advancedcharcoalmeiler114", "advancedcharcoalmeiler114"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 4)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Items für ein Pank
    var requieredCount = 10
    if (this.input.countOf(2) >= requieredCount) {
      if (this.currentwork == this.maxwork) {
        this.input.take(2, requieredCount, this.factory)
        for (var i = 0; i < 5; i++) {
          var item = new Item(4, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.dust++
          if (this.dust == 4) {
            var item = new Item(6, this.x * 48, this.y * 48)
            this.factory.items.push(item)
            item.setDFromDirection(this.direction)
            this.dust = 0
          }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class Briquettepress extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96
    this.currentwork = 0
    this.name = "briquettepress"
    this.i = 13
    this.dust = 0
    this.cost = [{
      "id": 0,
      "count": 100000
    }]
    this.texture = {
      "0": [],
      "1": ["briquettepress10", "briquettepress11", "briquettepress12", "briquettepress13", "briquettepress14", "briquettepress15", "briquettepress16", "briquettepress17", "briquettepress18", "briquettepress17", "briquettepress16", "briquettepress15", "briquettepress14", "briquettepress13", "briquettepress12", "briquettepress11", "briquettepress10", "briquettepress10", "briquettepress10"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 4)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Items für ein Pank
    var requieredCount = 5
    if (this.input.countOf(6) >= requieredCount) {
      if (this.currentwork == this.maxwork) {
        this.input.take(6, requieredCount, this.factory)
        var item = new Item(12, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}


class Cokery extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "cokery"
    this.i = 14
    this.dust = 0
    this.cost = [{
        "id": 0,
        "count": 60000
      },
      {
        "id": 3,
        "count": 1400
      },
      {
        "id": 6,
        "count": 20
      }
    ]
    this.texture = {
      "0": [],
      "1": ["cokery10", "cokery11", "cokery12", "cokery13"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    //Items für ein Pank
    if (this.input.countOf(4) >= 15 && this.input.countOf(12) >= 2) {
      if (this.currentwork == this.maxwork) {
        this.input.take(12, 2, this.factory)
        this.input.take(4, 15, this.factory)
        for (var i = 0; i < 15; i++) {
          var item = new Item(11, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else if (this.input.countOf(4) >= 15 && this.input.countOf(11) >= 2) {
      if (this.currentwork == this.maxwork) {
        this.input.take(11, 2, this.factory)
        this.input.take(4, 15, this.factory)
        for (var i = 0; i < 15; i++) {
          var item = new Item(11, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
        }
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class BlastfurnaceLower extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "blastfurnacelower"
    this.i = 16
    this.dust = 0
    this.cost = [{
        "id": 0,
        "count": 60000
      },
      {
        "id": 3,
        "count": 1400
      },
      {
        "id": 6,
        "count": 20
      }
    ]
    this.texture = {
      "0": [],
      "1": ["blastfurnacelower10"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  isUpperPartAttached() {
    switch (this.direction) {
      case "up":
        if (this.factory.tiles[this.x - 1][this.y] != undefined && this.factory.tiles[this.x - 1][this.y] != 0)
          if (this.factory.tiles[this.x - 1][this.y].i == 17)
            return true;
        break;
      case "right":
        if (this.factory.tiles[this.x][this.y - 1] != undefined && this.factory.tiles[this.x][this.y - 1] != 0)
          if (this.factory.tiles[this.x][this.y - 1].i == 17)
            return true;
        break;
      case "down":
        if (this.factory.tiles[this.x + 1][this.y] != undefined && this.factory.tiles[this.x + 1][this.y] != 0)
          if (this.factory.tiles[this.x + 1][this.y].i = 17)
            return true;
        break;
      case "left":
        if (this.factory.tiles[this.x][this.y + 1] != undefined && this.factory.tiles[this.x][this.y + 1] != 0)
          if (this.factory.tiles[this.x][this.y + 1].i == 17)
            return true;
        break;
      default:

    }
  }

  work() {

    if (this.isUpperPartAttached()) {
      if (this.input.countOf(16) >= 40 && this.input.countOf(11) >= 10) {
        if (this.currentwork == this.maxwork) {
          this.currentwork = 0
          this.input.take(16, 40, this.factory)
          this.input.take(11, 10, this.factory)
          for (var i = 0; i < 35; i++) {
            var item = new Item(33, this.x * 48, this.y * 48)
            this.factory.items.push(item)
            item.setDFromDirection(this.direction)
          }
        } else
          this.currentwork++
      }
    }
  }
}

class BlastfurnaceUpper extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 10
    this.currentwork = 0
    this.name = "blastfurnaceupper"
    this.i = 17
    this.dust = 0
    this.hasNoInventory = true
    this.cost = [{
        "id": 0,
        "count": 60000
      },
      {
        "id": 3,
        "count": 1400
      },
      {
        "id": 6,
        "count": 20
      }
    ]
    this.texture = {
      "0": [],
      "1": ["blastfurnaceupper10", "blastfurnaceupper11", "blastfurnaceupper12", "blastfurnaceupper13", "blastfurnaceupper14", "blastfurnaceupper15", "blastfurnaceupper16"]
    }
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {}
}

class Quarry extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 3
    this.i = 4
    this.currentwork = 0
    this.name = "quarry"
    this.hasNoInventory = true
    this.cost = [{
      "id": 0,
      "count": 5000
    }, {
      "id": 2,
      "count": 50
    }]
    this.texture = {
      "0": [],
      "1": ["quarry10"]
    }
    this.loadImages()
  }

  work() {
    this.currentwork = ((this.currentwork + 1) % this.maxwork)
    if (this.currentwork == 0) {
      var item = new Item(3, this.x * 48, this.y * 48)
      this.factory.items.push(item)
      item.setDFromDirection(this.direction)
    }
  }
}

class MineralWasher extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 60
    this.i = 15
    this.currentwork = 0
    this.name = "mineralwasher"
    this.hasNoInventory = true
    this.lastore = 0
    this.cost = [{
      "id": 0,
      "count": 50000
    }, {
      "id": 9,
      "count": 500
    }]
    this.texture = {
      "0": [],
      "1": ["mineralwasher10", "mineralwasher11", "mineralwasher12", "mineralwasher11"]
    }
    this.loadImages()
  }

  work() {
    this.currentwork = ((this.currentwork + 1) % this.maxwork)
    if (this.currentwork == 0) {
      var goodores = [];
      for (var i = 0; i < 4; i++) {
        if (minerals[minerals.nameFromId[this.factory.ores[i]]].depth <= 1) {
          if (minerals[minerals.nameFromId[this.factory.ores[i]]].oreid != undefined) {
            goodores.push(minerals[minerals.nameFromId[this.factory.ores[i]]].oreid)
          }
        }
      }
      if (goodores.length >= 1) {
        this.lastore = ((this.lastore + 1) % goodores.length)
        var item = new Item(goodores[this.lastore], this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
      }
    }
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class Collector extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "collector"
    this.hasNoInventory = true
    this.i = 5
    this.cost = [{
      "id": 0,
      "count": 50
    }]
    this.texture = {
      "0": [],
      "1": ["collector13", "collector10", "collector11", "collector12", "collector13", "collector13", "collector13"]
    }
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      inventory.addItem(item)
      this.factory.deleteItem(item)
    }
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class Spliter extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "spliter"
    this.hasNoInventory = true
    this.i = 6
    this.odd = true
    this.cost = [{
      "id": 0,
      "count": 200
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": ["spliter10"]
    }
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      var d = "right"
      if (this.odd) {
        switch (this.direction) {
          case "right":
            d = "down"
            break;
          case "down":
            d = "left"
            break;
          case "left":
            d = "up"
            break;
          case "up":
            d = "right"
            break;
        }
      } else {
        switch (this.direction) {
          case "right":
            d = "up"
            break;
          case "down":
            d = "right"
            break;
          case "left":
            d = "down"
            break;
          case "up":
            d = "left"
            break;
        }
      }
      item.setDFromDirection(d)
      this.odd = !this.odd
    }
  }
}

class FilterRight extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "filterright"
    this.hasNoInventory = true
    this.i = 9
    this.filter = 0
    this.cost = [{
      "id": 0,
      "count": 50000
    }, {
      "id": 2,
      "count": 200
    }]
    this.options = [{
      "type": "item",
      "var": "filter"
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": ["filterright10"]
    }
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      var d = this.direction
      if (item.id == this.filter)
        switch (this.direction) {
          case "right":
            d = "down"
            break;
          case "down":
            d = "left"
            break;
          case "left":
            d = "up"
            break;
          case "up":
            d = "right"
            break;
        }
      item.setDFromDirection(d)
    }
  }
}

class FilterLeft extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "filterleft"
    this.hasNoInventory = true
    this.i = 8
    this.filter = 0
    this.cost = [{
      "id": 0,
      "count": 50000
    }, {
      "id": 2,
      "count": 200
    }]
    this.options = [{
      "type": "item",
      "var": "filter"
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": ["filterleft10"]
    }
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      var d = this.direction
      if (item.id == this.filter)
        switch (this.direction) {
          case "right":
            d = "up"
            break;
          case "down":
            d = "right"
            break;
          case "left":
            d = "down"
            break;
          case "up":
            d = "left"
            break;
        }
      item.setDFromDirection(d)
    }
  }
}

class Warehouse extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "warehouse"
    this.hasNoInventory = true
    this.maxwork = 48 * 10
    this.sellPower = 500
    this.i = 7
    this.cost = [{
      "id": 0,
      "count": 20000
    }]
    this.pivot = 0
    this.toSell = 0
    this.options = [{
      "type": "item",
      "var": "toSell"
    }, {
      "type": "amount",
      "var": "pivot"
    }]
    this.texture = {
      "0": [],
      "1": ["warehouse10"]
    }
    this.loadImages()
  }

  work() {
    if (this.toSell != 0) {
      this.currentwork = ((this.currentwork + 1) % this.maxwork)
      if (this.currentwork == 0) {
        var sellAmount = inventory.countOf(this.toSell) - this.pivot
        if (sellAmount > 0) {
          sellAmount = Math.min(sellAmount, this.sellPower)
          if (inventory.take(this.toSell, sellAmount))
            money += items[this.toSell].value * sellAmount
        }
      }
    }
  }
}

class TeleporterInput extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "teleporterinput"
    this.hasNoInventory = true
    this.i = 20
    this.frequency = 0
    this.cost = [{
      "id": 0,
      "count": 50
    }]
    this.texture = {
      "0": ["teleporter00", "teleporter01", "teleporter02", "teleporter03", "teleporter04", "teleporter06", "teleporter07", "teleporter08", "teleporter09"],
      "1": []
    }
    this.options = [{
      "type": "amount",
      "var": "frequency"
    }]
    this.loadImages()
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }

  work() {
    if (teleporter[this.frequency] == undefined) {
      teleporter[this.frequency] = new FactoryInventory
    }
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      teleporter[this.frequency].addItem(item)
      this.factory.deleteItem(item)
    }
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class TeleporterOutput extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "teleporteroutput"
    this.hasNoInventory = true
    this.i = 21
    this.frequency = 0
    this.cost = [{
      "id": 0,
      "count": 50
    }]
    this.texture = {
      "0": ["teleporterout01", "teleporterout02", "teleporterout03", "teleporterout04", "teleporterout05", "teleporterout06", "teleporterout07", "teleporterout08", "teleporterout09"],
      "1": []
    }
    this.options = [{
      "type": "amount",
      "var": "frequency"
    }]
    this.loadImages()
  }

  work() {
    if (teleporter[this.frequency] == undefined) {
      teleporter[this.frequency] = new FactoryInventory
    }
    while (teleporter[this.frequency].items.length > 0) {
      var c = teleporter[this.frequency].itemcount[0]
      var id = teleporter[this.frequency].items[0]
      teleporter[this.frequency].take(id, c)
      for (var i = 0; i < c; i++) {
        var item = new Item(id, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
      }
    }
  }

  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class SimpleMiner extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 24 * 30
    this.i = 22
    this.currentwork = 0
    this.name = "simpleminer"
    this.hasNoInventory = true
    this.lastore = 0
    this.cost = [{
      "id": 0,
      "count": 50000
    }, {
      "id": 9,
      "count": 500
    }]
    this.texture = {
      "0": [],
      "1": ["simpleminer10"]
    }
    this.loadImages()
  }

  work() {
    this.currentwork = ((this.currentwork + 1) % this.maxwork)
    if (this.currentwork == 0) {
      var goodores = [];
      for (var i = 0; i < 4; i++) {
        if (minerals[minerals.nameFromId[this.factory.ores[i]]].depth <= 1) {
          if (minerals[minerals.nameFromId[this.factory.ores[i]]].oreid != undefined) {
            goodores.push(minerals[minerals.nameFromId[this.factory.ores[i]]].oreid)
          }

          if (minerals[minerals.nameFromId[this.factory.ores[i]]].itemid != undefined) {
            goodores.push(minerals[minerals.nameFromId[this.factory.ores[i]]].itemid)
          }
        }
      }
      if (goodores.length >= 1) {
        this.lastore = ((this.lastore + 1) % goodores.length)
        var item = new Item(goodores[this.lastore], this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
      }
    }
  }
}

class SoilMiner extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 24 * 30
    this.i = 23
    this.currentwork = 0
    this.name = "soilminer"
    this.hasNoInventory = true
    this.cost = [{
      "id": 0,
      "count": 50000
    }, {
      "id": 9,
      "count": 500
    }]
    this.texture = {
      "0": [],
      "1": ["soilminer10"]
    }
    this.loadImages()
  }

  work() {
    this.currentwork = ((this.currentwork + 1) % this.maxwork)
    if (this.currentwork == 0) {
      var item = new Item(38, this.x * 48, this.y * 48)
      this.factory.items.push(item)
      item.setDFromDirection(this.direction)
    }
  }
}

class Siev extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48
    this.currentwork = 0
    this.name = "siev"
    this.i = 24
    this.cost = [{
        "id": 0,
        "count": 750
      },
      {
        "id": 1,
        "count": 50
      }
    ]
    this.texture = {
      "0": [],
      "1": ["siev10"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    if (this.input.countOf(38) >= 9) {
      if (this.currentwork == this.maxwork) {
        this.input.take(38, 9, this.factory)
        for (var i = 0; i < 3; i++) {
          var item = new Item(39, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
          item = new Item(40, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
          item = new Item(41, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
          this.currentwork = 0
        }
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
}

class GlasMelt extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 30
    this.currentwork = 0
    this.name = "glasmelt"
    this.i = 25
    this.cost = [{
        "id": 0,
        "count": 750
      },
      {
        "id": 1,
        "count": 50
      }
    ]
    this.texture = {
      "0": [],
      "1": ["glassmelt10", "glassmelt11", "glassmelt12", "glassmelt13", "glassmelt14", "glassmelt15", "glassmelt16", "glassmelt17", "glassmelt18", "glassmelt19", "glassmelt110"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    if (this.input.countOf(39) >= 30) {
      if (this.currentwork == this.maxwork) {
        this.input.take(39, 30, this.factory)
        for (var i = 0; i < 10; i++) {
          var item = new Item(42, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
          this.currentwork = 0
        }
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class Glassblower extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 30
    this.currentwork = 0
    this.name = "glassblower"
    this.i = 25
    this.cost = [{
        "id": 0,
        "count": 750
      },
      {
        "id": 1,
        "count": 50
      }
    ]
    this.texture = {
      "0": [],
      "1": ["glassblower10"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    if (this.input.countOf(42) >= 2) {
      if (this.currentwork == this.maxwork) {
        this.input.take(42, 2, this.factory)
        var item = new Item(45, this.x * 48, this.y * 48)
        this.factory.items.push(item)
        item.setDFromDirection(this.direction)
        this.currentwork = 0
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class FertilizerMixer extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 48 * 30
    this.currentwork = 0
    this.name = "fertilizermixer"
    this.i = 28
    this.cost = [{
        "id": 0,
        "count": 750
      },
      {
        "id": 1,
        "count": 50
      }
    ]
    this.texture = {
      "0": [],
      "1": ["fertilizermixer10", "fertilizermixer11", "fertilizermixer12", "fertilizermixer13", "fertilizermixer14", "fertilizermixer15", "fertilizermixer16", "fertilizermixer17"]
    }
    this.loadImages()
  }

  work() {
    //Items für ein Pank
    if (this.input.countOf(39) >= 30) {
      if (this.currentwork == this.maxwork) {
        this.input.take(39, 30, this.factory)
        for (var i = 0; i < 10; i++) {
          var item = new Item(42, this.x * 48, this.y * 48)
          this.factory.items.push(item)
          item.setDFromDirection(this.direction)
          this.currentwork = 0
        }
      } else {
        this.currentwork++
      }
    } else {
      this.currentwork = 0
    }
  }
  getImage(fulltime, layer) {
    fulltime = Math.round(fulltime / 6)
    if (this.images[layer].length == 0)
      return "0"
    return this.images[layer][(fulltime % this.images[layer].length)]
  }
}

class PrecisionSpliterLeft extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "precisionspliterleft"
    this.hasNoInventory = true
    this.i = 26
    this.n = 0
    this.nn = 0
    this.cost = [{
      "id": 0,
      "count": 50
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": ["precisionspliterleft10"]
    }
    this.options = [{
      "type": "amount",
      "var": "n"
    }]
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      this.nn++;
      var d = this.direction
      if (this.n == this.nn) {
        switch (this.direction) {
          case "right":
            d = "up"
            break;
          case "down":
            d = "right"
            break;
          case "left":
            d = "down"
            break;
          case "up":
            d = "left"
            break;
        }
        this.nn = 0
      }
      item.setDFromDirection(d)
    }
  }
}

class PrecisionSpliterRight extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "precisionspliterright"
    this.hasNoInventory = true
    this.i = 27
    this.n = 0
    this.nn = 0
    this.cost = [{
      "id": 0,
      "count": 50
    }]
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": ["precisionspliterright10"]
    }
    this.options = [{
      "type": "amount",
      "var": "n"
    }]
    this.loadImages()
  }

  work() {
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      this.nn++;
      var d = this.direction
      if (this.n == this.nn) {
        switch (this.direction) {
          case "right":
            d = "down"
            break;
          case "down":
            d = "left"
            break;
          case "left":
            d = "up"
            break;
          case "up":
            d = "right"
            break;
        }
        this.nn = 0
      }
      item.setDFromDirection(d)
    }
  }
}


tileClasses.push(Conveyorbelt) //0
tileClasses.push(Treefarm) //1
tileClasses.push(Saw) //2
tileClasses.push(Charcoalmeiler) //3
tileClasses.push(Quarry) //4
tileClasses.push(Collector) //5
tileClasses.push(Spliter) //6
tileClasses.push(Warehouse) //7
tileClasses.push(FilterLeft) //8
tileClasses.push(FilterRight) //9
tileClasses.push(Weaver) //10
tileClasses.push(Papermanufactory) //11
tileClasses.push(AdvancedCharcoalmeiler) //12
tileClasses.push(Briquettepress) //13
tileClasses.push(Cokery) //14
tileClasses.push(MineralWasher) //15
tileClasses.push(BlastfurnaceLower) //16
tileClasses.push(BlastfurnaceUpper) //17
tileClasses.push(CrucibleFurnace) //18
tileClasses.push(Smith) //19
tileClasses.push(TeleporterInput) //20
tileClasses.push(TeleporterOutput) //21
tileClasses.push(SimpleMiner) //22
tileClasses.push(SoilMiner) //23
tileClasses.push(Siev) //24
tileClasses.push(GlasMelt) //25
tileClasses.push(PrecisionSpliterLeft) //26
tileClasses.push(PrecisionSpliterRight) //27
tileClasses.push(FertilizerMixer) //28
