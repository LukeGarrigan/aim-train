function RecentScores(username) {

  this.scores = [];
  this.counter = 0;
  this.username = username;

  this.display = function() {
    for (var i = 0; i < this.scores.length && i < 5; i++) {
      fill(255);
      textSize(30);
      text(username + ": " + this.scores[i], 50, 100+i*30);
    }
  }

  this.addScore = function(score) {
    if (this.scores.length >= 5) {
      this.scores.splice(this.scores.length-1);
    }
    this.scores.unshift(score);
  }




}
