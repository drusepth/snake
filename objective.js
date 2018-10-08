function Objective() {
  this.x = 0;
  this.y = 0;
  this.color = createVector(random(255), random(255), random(255));

  this.set_position = function(coordinate_vector) {
    this.x = coordinate_vector.x;
    this.y = coordinate_vector.y;
  };

  this.randomize_color = function() {
    this.color = createVector(random(255), random(255), random(255));
  }

  this.capture_objective = function (objective) {
  };
}
