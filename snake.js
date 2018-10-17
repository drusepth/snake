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
    var cols = floor(width / tile_scale);
    var rows = floor(height / tile_scale);
    var center_point = createVector(floor(cols / 2), floor(rows / 2));
    var x_translation = nuwa.x - center_point.x;
    var y_translation = nuwa.y - center_point.y;

    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      var relative_position = createVector(this.tail[i].x - x_translation, this.tail[i].y - y_translation);
      rect(relative_position.x * tile_scale, relative_position.y * tile_scale, tile_scale, tile_scale);
    }

    // Since the map is moving under us, we can safely assume we're always in the middle of it.
    rect(floor(rows / 2) * tile_scale, floor(cols / 2) * tile_scale, tile_scale, tile_scale);
  };

  this.turn_to = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.capture_objective = function (objective) {
    var distance = dist(this.x, this.y, objective.x, objective.y);
    //console.log('obj distance', distance);

    if (distance < 1) {
      this.total++;
      if (this.total % 20 == 0 && tile_scale > 5) {
        tile_scale -= 5;
      }
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
        tile_scale = 20;
      }
    }
  }
}
