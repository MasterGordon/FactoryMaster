$(window).resize(function() {
  style();
})

$(document).ready(function() {
  style();
})

function style() {
  $('#screen').css("margin-left", (window.innerWidth - 1200) / 2);
  $('#screen').css("margin-top", (window.innerHeight - 576) / 3);
  $('#build').css("width", (1200/2)-8)
  var topp = $('#screen').css("margin-top").substring(0,$('#screen').css("margin-top").length-2)
  $('#build').css("height", window.innerHeight-topp-576-32)
  $('#build').css("margin-left", $('#screen').css("margin-left"));
  $('#build').css("margin-top", (parseInt(topp)+576+16));
  $('#info').copyCSS('#build')
  $('#info').css("margin-left", pxToInt($('#screen').css("margin-left"))+16+(1200/2)-8)
}

function pxToInt(px){
  return parseInt(px.substring(0,px.length-2))
}
