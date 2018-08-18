
function Target() {
  this.pos = createVector(random(width), random(height));
  this.r = 30;
  this.visible = true;
  this.display = function() {
    if (this.visible) {
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

  }

  this.respawn = function() {
    this.score++;
    this.pos = createVector(random(width), random(height))
  }

  this.hide = function() {
    this.visible = false;
  }

  this.show = function() {
    this.visible = true;
  }


}
