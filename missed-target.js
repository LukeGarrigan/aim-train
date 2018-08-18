
function MissedTarget(x, y) {

  this.x = x;
  this.y = y;

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
    fill(255, 100, 100);
    textSize(30);
    text("-5", this.x, this.y);
  }

}
