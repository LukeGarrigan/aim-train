function AimTimer() {


  this.x = width/2;
  this.y = 100;
  this.time = 30;

  this.display = function() {



    if (this.time <= 3) {
      textSize(50);
      fill(255, 100, 100);
      text(this.time, this.x, this.y);

    } else {
      textSize(40);
      fill(255);
      text(this.time, this.x, this.y);
    }
  }
}
