
function MovingTarget() {

  this.pos = createVector(random(width), random(height));
  this.r = 50;
  this.multiplier = random(3, 7);

  this.velocity = p5.Vector.random2D();
  this.velocity = this.velocity.mult(this.multiplier);
  this.timeAlive = 0;
  this.isAlive = true;

  this.red = 100;
  this.green = 255;
  this.blue = 10;

  this.hasBeenClicked = false;
  this.clickedCount = 0;
  this.isVisible = true;

  this.update = function() {
    this.timeAlive++;
    this.pos.add(this.velocity);

    this.r = lerp(this.r, 0, 0.01);
    if (this.timeAlive > 180) {
      this.isVisible = false;
    }
    this.clickedCount++;
  }


  this.display = function() {
    if (this.isVisible) {
      noStroke()
      fill(this.red, this.green, this.blue);
      ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    if (this.hasBeenClicked && this.clickedCount > 3) {
        this.red = 100;
        this.green = 255;
        this.blue = 10;
        this.hasBeenClicked = false
    }
  }

  this.constrain = function() {
    if (this.pos.x < this.r) {
      this.velocity.x = abs(this.velocity.x);
    } else if(this.pos.x > width-this.r) {
      this.velocity.x = -abs(this.velocity.x);
    }

    if (this.pos.y < this.r) {
      this.velocity.y = abs(this.velocity.y);
    } else if(this.pos.y > height-this.r) {
      this.velocity.y = -abs(this.velocity.y);
    }

  }

  this.beenClicked = function() {
    this.blue = 200;
    this.green = 10;
    this.red = 255;
    this.hasBeenClicked = true;
    this.clickedCount = 0;
  }

  this.hide = function() {
    this.isVisible = false;
  }


}
