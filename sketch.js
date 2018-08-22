let aimTimer;
let score;
let numberOfStaticsHit = 0;
let recentScores;
let userClicks = [];
let greeting, button, input;
let hasGameStarted = false;
let numberOfClicksWhileGameStarted = 0;
const NUMBER_OF_TARGETS = 5;

let targets = [];


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
  for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
    let hasDone = false
    while(!hasDone) {
      let newTarget = new Target(i, targets);
      hasDone = newTarget.hasFoundTargetPosition(i);
    }
  }

  aimTimer = new AimTimer();
  score = new Score();

}


function draw() {
  if (hasGameStarted) {
    background(0);

    aimTimer.display();
    score.display();
    recentScores.display();

    for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
      if (targets[i].hasRespawned) {
        userClicks.push(new MissedTarget(targets[i].previousPos.x, targets[i].previousPos.y, 3));
        score.score -= 3;

      }
      targets[i].update();
      targets[i].display();

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
  for (let i = userClicks.length-1; i >= 0; i--) {
    userClicks[i].update();
    userClicks[i].display();
    if (!userClicks[i].isVisible) {
      userClicks.splice(i, 1);
    }
  }
}
function mousePressed() {
  console.log(hasGameStarted);
  if (hasGameStarted) {
    numberOfClicksWhileGameStarted++;
  }
  if (numberOfClicksWhileGameStarted > 1) {
    let hasHitStaticTarget = processUserClickedStaticTarget();
    if (!hasHitStaticTarget) {
      processedMissedTarget();
    }
  }

}


function processUserClickedMovingTarget() {
  let hasHitATarget = false;
  let distance = dist(mouseX, mouseY, movingTarget.pos.x, movingTarget.pos.y);
  if (distance < movingTarget.r) {
    hasHitATarget = true;
    score.score += 8;
    userClicks.push(new HitTarget(mouseX, mouseY, 8));
    movingTarget.beenClicked();
  }

  return hasHitATarget;
}


function processUserClickedStaticTarget() {
  let hasHitATarget = false;
  for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
    let distance = dist(mouseX, mouseY, targets[i].pos.x, targets[i].pos.y);
    if (distance < targets[i].r) {
      hasHitATarget = true;
      console.log(targets[i].timeAlive);
      userClicks.push(new HitTarget(mouseX, mouseY, Math.floor(600/targets[i].timeAlive)));
      score.score+= Math.floor(600/targets[i].timeAlive);
      targets[i].respawn(true);
      numberOfStaticsHit++;
    }
  }
  return hasHitATarget;
}


function processedMissedTarget() {
  score.score -= 5;
  userClicks.push(new MissedTarget(mouseX, mouseY, 5));
}
