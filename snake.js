function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.update = function() {
    // Build tail
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;

    // todo remove this when we go infinite
    // this.x = constrain(this.x, 0, width - tile_scale);
    // this.y = constrain(this.y, 0, height - tile_scale);
  };

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      // Avoid an unfortunate race condition :(
      if (this.tail[i] !== undefined) {
        rect(this.tail[i].x, this.tail[i].y, tile_scale, tile_scale);
      }
    }

    var cols = floor(width / tile_scale);
    var rows = floor(height / tile_scale);

    // Since the map is moving under us, we can safely assume we're always in
    // the middle of it.
    rect(rows / 2 * tile_scale, cols / 2 * tile_scale, tile_scale, tile_scale);
  };

  this.turn_to = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.capture_objective = function (objective) {
    var distance = dist(this.x, this.y, objective.x, objective.y);
    console.log('obj distance', distance);

    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      if (pos === undefined) {
        continue;
      }
      var distance = dist(this.x, this.y, pos.x, pos.y);
      if (distance < 1) {
        this.total  = 0;
        this.tail   = [];
        this.xspeed = 0;
        this.yspeed = 0;
      }
    }
  }
}
