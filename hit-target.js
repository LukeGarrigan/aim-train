function HitTarget(x, y, increment) {

  this.x = x;
  this.y = y;
  this.increment = increment;

  this.displayCounter = 0;

  this.isVisible = true;
  this.update = function() {
    this.displayCounter++;
    if (this.displayCounter > 20) {
      console.log(this.displayCounter);
      this.isVisible = false;
    }
  }

  this.display = function() {
    fill(100, 255, 100);
    textSize(30);
    text("+ "+increment, this.x, this.y);
  }

}
