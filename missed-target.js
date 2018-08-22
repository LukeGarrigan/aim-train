
function MissedTarget(x, y, amount) {

  this.x = x;
  this.y = y;
  this.amount = amount;

  this.displayCounter = 0;

  this.isVisible = true;
  this.update = function() {
    this.displayCounter += 5;
    if (this.displayCounter >= 255) {
      this.isVisible = false;
    }
  }

  this.display = function() {
    fill(255, 100, 100, 255-this.displayCounter);
    textSize(30);
    text("-" + this.amount, this.x, this.y);
  }

}
