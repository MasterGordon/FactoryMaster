var directions = {
  "right": {
    "degree": 0,
    "dx": 1,
    "dy": 0
  },
  "down": {
    "degree": 90,
    "dx": 0,
    "dy": 1
  },
  "left": {
    "degree": 180,
    "dx": -1,
    "dy": 0
  },
  "up": {
    "degree": 270,
    "dx": 0,
    "dy": -1
  }
}

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
