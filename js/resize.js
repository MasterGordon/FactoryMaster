$(window).resize(function() {
  style();
})

$(document).ready(function() {
  style();
})

function style() {
  $('#screen').css("margin-left", (window.innerWidth - 1200) / 2);
  $('#screen').css("margin-top", (window.innerHeight - 576) / 3);
}
