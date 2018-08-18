var target;
var movingTarget;
var aimTimer;
var score;
var numberOfStaticsHit = 0;
var recentScores;
var userClicks = [];
var greeting, button, input;
var hasGameStarted = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);


  input = createInput();
  input.position(width/2-250, height/2);

  button = createButton('Play');
  button.position(width/2-250, height/2+80);
  button.mousePressed(userHasInputName);
}

function userHasInputName() {
  button.style("visibility", "hidden");
  input.style("visibility", "hidden");
  hasGameStarted = true;
  recentScores = new RecentScores(input.value());

  restartGame();
}

function restartGame() {
  console.log("Start game called");
  movingTarget = new MovingTarget();
  movingTarget.hide();
  target = new Target();
  aimTimer = new AimTimer();
  score = new Score();
}


function draw() {
  console.log("game started" + hasGameStarted);
  if (hasGameStarted) {
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

}

function displayUserClicks() {
  for (var i = userClicks.length-1; i >= 0; i--) {
    userClicks[i].update();
    userClicks[i].display();
    if (!userClicks[i].isVisible) {
      userClicks.splice(i, 1);
    }
  }
}
function mousePressed() {

  if (hasGameStarted) {
    var hasHitStaticTarget = processUserClickedStaticTarget();

    var hasHitMovingTarget = processUserClickedMovingTarget();

    if (!hasHitStaticTarget && !hasHitMovingTarget) {
      processedMissedTarget();
    }
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
