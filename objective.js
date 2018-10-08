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

  this.coordinate_vector = function() {
    return createVector(this.x, this.y);
  };

  this.reward_coordinate_vectors = function () {
    return [
      createVector(this.x, this.y),
      // up/down/left/right
      createVector(this.x - tile_scale, this.y),
      createVector(this.x + tile_scale, this.y),
      createVector(this.x, this.y - tile_scale),
      createVector(this.x, this.y + tile_scale),
      // even further up/down/left/right
      createVector(this.x - 2 * tile_scale, this.y),
      createVector(this.x + 2 * tile_scale, this.y),
      createVector(this.x, this.y - 2 * tile_scale),
      createVector(this.x, this.y + 2 * tile_scale),
      // diagonals
      createVector(this.x - tile_scale, this.y - tile_scale),
      createVector(this.x - tile_scale, this.y + tile_scale),
      createVector(this.x + tile_scale, this.y - tile_scale),
      createVector(this.x + tile_scale, this.y + tile_scale)
    ];
  };
}
