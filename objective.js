function Objective() {
  this.x = 0;
  this.y = 0;
  this.color;

  this.possible_colors = [
    createVector(0, 200, 0)
  ]; // todo graph water --> land, land --> forest/sand/water/etc

  this.set_position = function(coordinate_vector) {
    this.x = coordinate_vector.x;
    this.y = coordinate_vector.y;
  };

  this.randomize_color = function() {
    this.color = this.possible_colors[floor(random(this.possible_colors.length))];
  }

  this.coordinate_vector = function() {
    return createVector(this.x, this.y);
  };

  this.reward_coordinate_vectors = function () {
    return [
      createVector(this.x, this.y),
      // up/down/left/right
      createVector(this.x - 1, this.y),
      createVector(this.x + 1, this.y),
      createVector(this.x, this.y - 1),
      createVector(this.x, this.y + 1),
      // even further up/down/left/right
      createVector(this.x - 2, this.y),
      createVector(this.x + 2, this.y),
      createVector(this.x, this.y - 2),
      createVector(this.x, this.y + 2),
      // diagonals
      createVector(this.x - 1, this.y - 1),
      createVector(this.x - 1, this.y + 1),
      createVector(this.x + 1, this.y - 1),
      createVector(this.x + 1, this.y + 1)
    ];
  };
}
