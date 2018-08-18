var target;
var movingTarget;
var aimTimer;
var score;
var numberOfStaticsHit = 0;
var recentScores;
var userClicks = [];

function setup() {
  createCanvas(1920,1080);
  recentScores = new RecentScores();
  restartGame();
}

function restartGame() {
  movingTarget = new MovingTarget();
  movingTarget.hide();
  target = new Target();
  aimTimer = new AimTimer();
  score = new Score();
}


function draw() {
  background(0);
  target.display();
  aimTimer.display();
  score.display();

  movingTarget.display();
  movingTarget.update();
  movingTarget.constrain();
  recentScores.display();

  if (!movingTarget.isVisible) {
    this.target.show();
  }

  if (frameCount % 60 == 0) {
    aimTimer.time--;
    if (aimTimer.time <= 0) {
      recentScores.addScore(score.score);
      restartGame();
    }
  }


  displayUserClicks();
}

function displayUserClicks() {
  console.log(userClicks.length);
  for (var i = userClicks.length-1; i >= 0; i--) {
    userClicks[i].update();
    userClicks[i].display();
    if (!userClicks[i].isVisible) {
      userClicks.splice(i, 1);
    }
  }
}
function mousePressed() {

  var hasHitStaticTarget = processUserClickedStaticTarget();

  var hasHitMovingTarget = processUserClickedMovingTarget();


  if (!hasHitStaticTarget && !hasHitMovingTarget) {


    processedMissedTarget();
  }

}


function processUserClickedMovingTarget() {
  var hasHitATarget = false;
  var distance = dist(mouseX, mouseY, movingTarget.pos.x, movingTarget.pos.y);
  if (distance < movingTarget.r) {
    hasHitATarget = true;
    score.score += 8;
    userClicks.push(new HitTarget(mouseX, mouseY, 8));
    movingTarget.beenClicked();
  }

  return hasHitATarget;
}


function processUserClickedStaticTarget() {
  var distance = dist(mouseX, mouseY, target.pos.x, target.pos.y);
  var hasHitATarget = false;
  if (distance < target.r) {
    hasHitATarget = true;
    userClicks.push(new HitTarget(mouseX, mouseY, 10));
    score.score+=10;
    target.respawn();
    numberOfStaticsHit++;
    if (numberOfStaticsHit % 5 == 0) {
      movingTarget = new MovingTarget();
      target.hide();
    }
  }

  return hasHitATarget;
}


function processedMissedTarget() {
  score.score -= 5;
  userClicks.push(new MissedTarget(mouseX, mouseY));
}
