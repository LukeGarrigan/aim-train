function RecentScores() {

  this.scores = [];

  this.counter = 0;
  this.display = function() {


    for (var i = 0; i < this.scores.length && i < 5; i++) {
      fill(255);
      textSize(30);
      text(this.scores[i], 50, 100+i*30);
    }

    // this.counter = 0;
    // for (var i = this.scores.length; i >= 0; i--) {
    //     fill(255);
    //     textSize(30);
    //     text(this.scores[i], 50, 100+this.counter*30);
    //     this.counter++;
    // }
  }

  this.addScore = function(score) {
    this.scores.unshift(score);
  }




}
