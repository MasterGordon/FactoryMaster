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
        var item = new Item(9, this.x * 48, this.y * 48)
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
      "count": 10000
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
      "1": ["collector10"]
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
tileClasses.push(Conveyorbelt)
tileClasses.push(Treefarm)
tileClasses.push(Saw)
tileClasses.push(Charcoalmeiler)
tileClasses.push(Quarry)
tileClasses.push(Collector)
tileClasses.push(Spliter)
tileClasses.push(Warehouse)
tileClasses.push(FilterLeft)
tileClasses.push(FilterRight)
tileClasses.push(Weaver)
tileClasses.push(Papermanufactory)
