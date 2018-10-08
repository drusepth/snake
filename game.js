var nuwa;
var tile_scale = 10;
var vision_radius = 5;
var drawn_world = {};

var objective;

function setup() {
  createCanvas(600, 600);
  frameRate(10);

  objective = new Objective();
  nuwa = new Snake();

  objective.set_position(random_location());
}

function random_location() {
  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);

  return createVector(floor(random(cols)), floor(random(rows))).mult(tile_scale);
}

function draw() {
  background(88);
  nuwa.update();
  nuwa.show();

  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);
  for (var y = 0; y < cols; y++) {
    for (var x = 0; x < rows; x++) {
      var this_cell_position = createVector(x, y);
      var cell_data = drawn_world[this_cell_position] || null;
      if (cell_data !== null) {
        fill(cell_data);
        rect(x * tile_scale, y * tile_scale, tile_scale, tile_scale);
      }
    }
  }

  if (nuwa.capture_objective(objective)) {
    objective.set_position(random_location());
    objective.randomize_color();
  }
  nuwa.death();

  fill(objective.color.x, objective.color.y, objective.color.z);
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
