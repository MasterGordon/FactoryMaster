var tileClasses = []

//Hier sind alle im Tiles welche im Spiel präsent sind

class Conveyorbelt extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "conveyorbelt"
    this.hasNoInventory = true
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
tileClasses.push(Conveyorbelt)

class Treefarm extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96
    this.currentwork = 0
    this.name = "treefarm"
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
tileClasses.push(Treefarm)

class Saw extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96
    this.currentwork = 0
    this.name = "saw"
    this.cost = [{
        "id": 0,
        "count": 50
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
    if (this.input.countOf(1) >= requieredCount) {
      if (this.currentwork == 96) {
        this.input.take(1, requieredCount, this.factory)
        var item = new Item(2, this.x * 48, this.y * 48)
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
tileClasses.push(Saw)

class Quarry extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.maxwork = 96 * 3
    this.currentwork = 0
    this.name = "quarry"
    this.hasNoInventory = true
    this.cost = [{
      "id": 0,
      "count": 100
    },{
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
tileClasses.push(Quarry)

class Collector extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "collector"
    this.hasNoInventory = true
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
tileClasses.push(Collector)

class Spliter extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "spliter"
    this.hasNoInventory = true
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
tileClasses.push(Spliter)

class Warehouse extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "warehouse"
    this.hasNoInventory = true
    this.maxwork = 48 * 10
    this.sellPower = 500
    this.cost = [{
      "id": 0,
      "count": 20000
    }]
    this.pivot = 0
    this.toSell = 1
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
tileClasses.push(Warehouse)
