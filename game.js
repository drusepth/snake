var nuwa;
var tile_scale = 25;
var vision_radius = 5;
var drawn_world = {};

var objective_count = 1;
var objectives = [];

function setup() {
  createCanvas(600, 600);
  frameRate(10);

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

  return createVector(floor(random(cols)), floor(random(rows)));
}

function draw() {
  background(0, 0, 200);
  nuwa.update();

  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);
  console.log('Nuwa:', nuwa.x, nuwa.y);

  var upper_left_boundary = createVector(nuwa.x - cols / 2, nuwa.y - rows / 2);
  var bottom_right_boundary = createVector(nuwa.x + cols / 2, nuwa.y + rows / 2);

  var center_point = createVector(parseInt(cols / 2), parseInt(rows / 2));
  var x_translation = nuwa.x - center_point.x;
  var y_translation = nuwa.y - center_point.y;

  for (var y = upper_left_boundary.y; y < bottom_right_boundary.y; y++) {
    for (var x = upper_left_boundary.x; x < bottom_right_boundary.x; x++) {
      var this_cell_position = createVector(x, y);
      var relative_coordinates = createVector(this_cell_position.x - x_translation, this_cell_position.y - y_translation);
      var cell_data = drawn_world[this_cell_position] || null;
      if (cell_data !== null) {
        fill(cell_data.x, cell_data.y, cell_data.z);
        rect(relative_coordinates.x * tile_scale, relative_coordinates.y * tile_scale, tile_scale, tile_scale);
      }
    }
  }

  // we have relative movement kind of working, but not really
  // check the demo
  // snake is centered
  // objectives move as you'd expect
  // you can remove the || createVector abpve (replace with || null)
  // need to capture objectives with relative distance instead?
  // need to figure out a way to label each square properly, would make things a lot easier (and/or borders)

  for (var i = 0; i < objectives.length; i++) {
    var objective = objectives[i];
    console.log('Objective:', objective.x, objective.y);
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

  // Paint nuwa and the objectives last, so they're always on top of the painted world
  nuwa.show();
  nuwa.death();

  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);
  var center_point = createVector(parseInt(cols / 2), parseInt(rows / 2));
  var x_translation = nuwa.x - center_point.x;
  var y_translation = nuwa.y - center_point.y;

  fill(0, 255, 255);
  for (var i = 0; i < objectives.length; i++) {
    var objective = objectives[i];
    var relative_coordinates = createVector(objective.x - x_translation, objective.y - y_translation);
    console.log("Drawing objective @", relative_coordinates.x, relative_coordinates.y);
    rect(relative_coordinates.x * tile_scale, relative_coordinates.y * tile_scale, tile_scale, tile_scale);
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
