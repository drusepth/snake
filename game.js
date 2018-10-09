var nuwa;
var tile_scale = 25;
var vision_radius = 5;
var drawn_world = {};

var objective_count = 3;
var objectives = [];

function setup() {
  createCanvas(600, 600);
  frameRate(20);

  for (var i = 0; i < objective_count; i++) {
    var objective = new Objective();
    objective.set_position(random_location());
    objective.randomize_color();
    objectives.push(objective);
  }
  nuwa = new Snake();
}

function random_location() {
  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);

  return createVector(floor(random(cols)), floor(random(rows))).mult(tile_scale);
}

function draw() {
  background(0, 0, 255);
  nuwa.update();

  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);
  for (var y = 0; y < cols; y++) {
    for (var x = 0; x < rows; x++) {
      var this_cell_position = createVector(x, y).mult(tile_scale);
      var cell_data = drawn_world[this_cell_position] || null;
      if (cell_data !== null) {
        fill(cell_data.x, cell_data.y, cell_data.z);
        rect(x * tile_scale, y * tile_scale, tile_scale, tile_scale);
      }
    }
  }

  for (var i = 0; i < objectives.length; i++) {
    var objective = objectives[i];
    if (nuwa.capture_objective(objective)) {
      var coordinates_to_paint = objective.reward_coordinate_vectors();
      for (var i = 0; i < coordinates_to_paint.length; i++) {
        drawn_world[coordinates_to_paint[i]] = objective.color;
      }

      // Re-use this objective instead of making a new one + garbage collecting
      objective.set_position(random_location());
      objective.randomize_color();
    }
  }

  // Paint nuwa and the objective last, so they're always on top of the painted world
  nuwa.show();
  nuwa.death();

  fill(0, 255, 255);
  for (var i = 0; i < objectives.length; i++) {
    var objective = objectives[i];
    rect(objective.x, objective.y, tile_scale, tile_scale);
  }
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
