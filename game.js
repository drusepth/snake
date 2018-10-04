var nuwa;
var tile_scale = 10;

var objective;

function setup() {
  createCanvas(600, 600);
  frameRate(10);

  objective = random_location();
  nuwa = new Snake();
}

function random_location() {
  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);

  return createVector(floor(random(cols)), floor(random(rows))).mult(tile_scale);
}

function draw() {
  background(51);
  nuwa.update();
  nuwa.show();

  if (nuwa.capture_objective(objective)) {
    objective = random_location();
  }
  nuwa.death();

  fill(255, 0, 100);
  rect(objective.x, objective.y, tile_scale, tile_scale);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    nuwa.turn_to(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    nuwa.turn_to(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    nuwa.turn_to(1, 0)
  } else if (keyCode === LEFT_ARROW) {
    nuwa.turn_to(-1, 0);
  }
}
