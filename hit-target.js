function HitTarget(x, y, increment) {

  this.x = x;
  this.y = y;
  this.increment = increment;

  this.displayCounter = 0;

  this.isVisible = true;
  this.update = function() {
    this.displayCounter +=5;
    if (this.displayCounter >= 255) {
      console.log(this.displayCounter);
      this.isVisible = false;
    }
  }

  this.display = function() {
    fill(100, 255, 100, 255-this.displayCounter);
    textSize(30);
    text("+ "+this.increment, this.x, this.y);
  }

}
