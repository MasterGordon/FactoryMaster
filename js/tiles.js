var tileClasses = []

//Hier sind alle im Tiles welche im Spiel präsent sind

class Conveyorbelt extends Tile {
  constructor(x, y) {
    super(x, y)
    this.name = "conveyorbelt"
    this.texture = {
      "0": ["conveyorbelt00", "conveyorbelt01", "conveyorbelt02", "conveyorbelt03", "conveyorbelt04", "conveyorbelt05", "conveyorbelt06"],
      "1": []
    }
  }
}
for(var i=0;i<1000;i++){
tileClasses.push(Conveyorbelt)
}
