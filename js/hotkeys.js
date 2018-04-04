$(document).ready(function() {
  $(document).keypress(function(e) {
    console.log(e.originalEvent)
    switch (e.originalEvent.key) {
      case "1":
        //BUILD
        if (mode == "none") {
          $('#buildselect').fadeIn(200)
          mode = "selectbuilding"
        } else {
          closeUi()
        }
        break
      case "2":
        //MOVE
        if (mode == "none") {
          mode = "move"
        } else {
          closeUi()
        }
        break
      case "3":
        //ROTATE
        if (mode == "none") {
          mode = "rotate"
        } else {
          closeUi()
        }
        break
      case "4":
        //ROTATE
        if (mode == "none") {
          mode = "delete"
        } else {
          closeUi()
        }
        break
      case "i":
        renderItems = !renderItems
        break
    }
  })
})
