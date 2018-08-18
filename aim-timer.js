function AimTimer() {


  this.x = width/2;
  this.y = 100;
  this.time = 15;

  this.display = function() {
    fill(255);
    textSize(40);
    text(this.time, this.x, this.y);
  }
}
