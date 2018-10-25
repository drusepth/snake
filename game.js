var nuwa;
var tile_scale = 20;
var expansion_radius = 10;
var vision_radius = 5;
var drawn_world = {};

var objective_count = 10;
var objectives = [];

function setup() {
  createCanvas(600, 600);
  frameRate(10);

  nuwa = new Snake();
  for (var i = 0; i < objective_count; i++) {
    var objective = new Objective();
    objective.set_position(random_location());
    objective.randomize_color();
    objectives.push(objective);
  }
}

function random_location() {
  return createVector(
    floor(random(nuwa.x - expansion_radius, nuwa.x + expansion_radius)),
    floor(random(nuwa.y - expansion_radius, nuwa.y + expansion_radius))
  );
}

function draw() {
  background(25, 105, 255);
  nuwa.update();

  var cols = floor(width / tile_scale);
  var rows = floor(height / tile_scale);
  //console.log('Nuwa:', nuwa.x, nuwa.y);

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

  for (var i = 0; i < objectives.length; i++) {
    var objective = objectives[i];
    //console.log('Objective:', objective.x, objective.y);
    if (nuwa.capture_objective(objective)) {
      var coordinates_to_paint = objective.reward_coordinate_vectors();
      for (var i = 0; i < coordinates_to_paint.length; i++) {
        drawn_world[coordinates_to_paint[i]] = objective.reward;
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
    //console.log("Drawing objective @", relative_coordinates.x, relative_coordinates.y);
    rect(relative_coordinates.x * tile_scale, relative_coordinates.y * tile_scale, tile_scale, tile_scale);
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if (nuwa.current_direction() != 'down') {
        nuwa.turn_to(0, -1);
      }
      break;

    case DOWN_ARROW:
      if (nuwa.current_direction() != 'up') {
        nuwa.turn_to(0, 1);
      }
      break;

    case RIGHT_ARROW:
      if (nuwa.current_direction() != 'left') {
        nuwa.turn_to(1, 0);
      }
      break;

    case LEFT_ARROW:
      if (nuwa.current_direction() != 'right') {
        nuwa.turn_to(-1, 0);
      }
      break;

    case 189: // minus key
      if (tile_scale > 5) {
        tile_scale -= 5;
      }
      console.log('new tile scale: ' + tile_scale);
      break;

    case 187: // plus key
      if (tile_scale < 30) {
        tile_scale += 5;
      }
      console.log('new tile scale: ' + tile_scale);
      break;

    default:
      console.log(keyCode + ' pressed.');

  }
}
