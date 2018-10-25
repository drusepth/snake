function Objective() {
  this.x = 0;
  this.y = 0;
  this.color = null;
  this.reward = null;

  this.TILE_WATER  = createVector(25, 105, 255);
  this.TILE_GRASS  = createVector(144, 238, 144);
  this.TILE_SAND   = createVector(194, 178, 128);
  this.TILE_DIRT   = createVector(237, 201, 175);
  this.TILE_FOREST = createVector(34, 139, 34);

  this.set_position = function(coordinate_vector) {
    this.x = coordinate_vector.x;
    this.y = coordinate_vector.y;
  };

  this.randomize_color = function() {
    var current_world_tile = drawn_world[this.coordinate_vector()];
    console.log('current world tile: ' + current_world_tile);

    switch (current_world_tile) {
      case undefined: // water tile
      case null:
      case this.TILE_WATER:
        this.reward = this.random_selection([
          this.TILE_GRASS
        ]);
        break;

      case this.TILE_DIRT:
        this.reward = this.random_selection([
          this.TILE_GRASS,
          this.TILE_SAND
        ]);
        break;

      case this.TILE_GRASS:
        this.reward = this.random_selection([
          this.TILE_WATER,
          this.TILE_DIRT,
          this.TILE_FOREST
        ]);
        break;

      case this.TILE_FOREST:
        this.reward = this.TILE_GRASS;
        break;

      case this.TILE_SAND:
        this.reward = this.TILE_GRASS;
        break;

      default:
        this.reward = this.random_selection([
          this.TILE_GRASS,
          this.TILE_WATER
        ]);
        break;
    }
  }

  this.random_selection = function(options_list) {
    return options_list[floor(random(options_list.length))];
  };

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
