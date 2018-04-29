var directions = {
  "right": {
    "d": 0,
    "degree": 0,
    "dx": 1,
    "dy": 0
  },
  "down": {
    "d": 1,
    "degree": 90,
    "dx": 0,
    "dy": 1
  },
  "left": {
    "d": 2,
    "degree": 180,
    "dx": -1,
    "dy": 0
  },
  "up": {
    "d": 3,
    "degree": 270,
    "dx": 0,
    "dy": -1
  }
}

var d = ["right", "down", "left", "up"]

//Umrechnung von Grad zu Bogenmaß
var TO_RADIANS = Math.PI / 180;

function drawRotatedImage(image, x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle * TO_RADIANS);
  ctx.drawImage(image, -(image.width / 2), -(image.height / 2));
  ctx.restore();
}

function infoDrawRotatedImage(image, x, y, angle) {
  infoCtx.save();
  infoCtx.translate(x, y);
  infoCtx.rotate(angle * TO_RADIANS);
  infoCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
  infoCtx.restore();
}

function formatItemCount(c) {
  if (c > 1000000)
    return 1000000
  return c;
}

function formatCount(c) {
  if (c == 0)
    return 0
  for (var pow = 0; pow < lang.numbers.length; pow++) {
    if (c / Math.pow(10, pow * 3) >= 1 && c / Math.pow(10, pow * 3) < 1000) {
      return round(c / Math.pow(10, pow * 3), 3) + lang.numbers[pow]
    }
  }
  return round(c / Math.pow(10, (lang.numbers.length - 1) * 3), 3) + lang.numbers[(lang.numbers.length - 1)]
}

function round(n, p) {
  var factor = Math.pow(10, p);
  return Math.round(n * factor) / factor;
}
