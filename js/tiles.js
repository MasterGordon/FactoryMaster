var tileClasses = []

//Hier sind alle im Tiles welche im Spiel präsent sind

class Conveyorbelt extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "conveyorbelt"
    this.hasNoInventory = true
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

class Collector extends Tile {
  constructor(x, y, factory) {
    super(x, y, factory)
    this.name = "collector"
    this.hasNoInventory = true
    this.texture = {
      "0": [],
      "1": ["collector10"]
    }
    this.loadImages()
  }

  work() {
    console.log(this.input)
    while (this.input.items.length > 0) {
      var item = this.input.items.pop()
      inventory.addItem(item)
      this.factory.deleteItem(item)
      console.log(item)
    }
  }
}
tileClasses.push(Collector)
