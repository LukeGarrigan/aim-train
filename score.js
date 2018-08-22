function Score() {

  this.score = 0;

  this.display = function() {
    fill(255);
    textSize(40);
    text(this.score, width-100, 100);
  }

}
