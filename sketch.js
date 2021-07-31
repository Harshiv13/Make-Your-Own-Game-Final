//defining variables
{var player, playerImg, playerLabel, playerLabelImg;
var spike, spikesImgUp, spikesImgDown, gaps;
var laser, laserMan, laserIdle, laserShooting, laserWait;
var border;
var particles, particlesGroup;
var coins, coinImg, coinSound;
var coinsCollected = 0;
var gameState = "start";
var startMusic, playMusic, endSound;
var coinSine = 0;
var score = 0;
var respawnCountdown;}
//preloading everything that needs to be loaded before it is used
function preload() {
  //loading the music
  startMusic = new Audio("startMusic.mp3");
  startMusic.volume = 0.7;
  playMusic = new Audio("playMusic.mp3");
  playMusic.volume = 0.1;
  endSound = new Audio("endSound.mp3");
  coinSound = new Audio("collected.mp3")
  playerLabelImg = loadImage("label-player.png")
  coinImg = loadImage("coin.png")
  playerImg = loadImage("jetpack.png")
  laserIdle = loadImage("idle.png")
  laserShooting = loadImage("shooting-ray.png")
  spikesImgUp = loadImage("spikesUp.png")
  spikesImgDown = loadImage("spikesDown.png")
}
//setting position
function setup() {

  var canvas = createCanvas(1260, 600);
  //starting the background music for the start of the game
  startMusic.play();
  //particles
  particlesGroup = new Group();
  //player
  player = createSprite(200, 100, 50, 50);
  player.shapeColor = "#107ab0";
  player.setCollider("rectangle", 0, 0, 50, 50);
  player.visible = false;
  player.addImage(playerImg)
  player.scale = 0.2
  player.setCollider("rectangle",0,25,250,300,0)
  //coins
  coins = createSprite(Math.round(random(1300, 1600)), 320, 35, 35);
  coins.scale = 0.05;
  coins.addImage(coinImg)
  //borders
  border1 = createSprite(630, 25, 1260, 50);
  border2 = createSprite(630, 625, 1260, 150);
  //spikes
  spike = createSprite(Math.round(random(1300, 2600)), 62.5, 25, 25);
  spike.shapeColor = "#ED2939";
  spike.scale = 0.2
  //gaps
  gaps = createSprite(Math.round(random(1300, 2600)), 574, 100, 50);
  gaps.shapeColor = 100;
  //laser: enemy#2
  laser = createSprite(-400, 300, 3000, 5);
  laser.shapeColor = rgb(96, 226, 243);
  laser.visible = false;
  laserMan = createSprite(1140, -50, 50, 50)
  laserMan.addImage(laserIdle)
  laserMan.shapeColor = "red"
  //labels
  playerLabel = createSprite()
  playerLabel.addImage(playerLabelImg)
  playerLabel.scale = 0.1
}
//the game
function draw() {
  //setting the background to a dark gray
  background(100);
  //text for score and coins
  fill("white");
  textFont("monospace")
  text("coins: " + coinsCollected, 1150, 100)
  text("Score: " + score, 50, 100)
  //displaying title and instructions
  if(gameState == "start"){
    textFont("monospace")
    fill("lightgrey")
    textSize(40);
    text("Jetpack Guy", 200, 200)
    textSize(20);
    fill("grey")
    text("[Press Space to start]", 200, 230)
    text("[Press the up key to fly]", 200, 260)
    text("[Avoid spikes and gaps in the floor and ceiling]", 200, 290)
    text("[Also avoid the laser, which you will be warned about by a thin line]", 200, 320)
    text("[The laser may be a bit buggy sometimes, so simply refresh when this happens]", 200, 350)
    text("[Collect as many coins as you can, and survive for as long as you can!]", 200, 380)
    text("[Both of these raise your score.]", 200, 410)
    fill("lightgreen")
    textSize(30)
    text("GOOD LUCK!", 200, 480)
    playerLabel.visible = false;
  }
  //starting the game
  if(keyDown("SPACE") && (gameState == "start" || gameState == "end")){
    //resetting everything
    frameCount = 0;
    startMusic.pause();
    score = 0;
    coinsCollected = 0;
    playMusic.currentTime = 0;
    gameState = "play";
    player.visible = true;
    player.x = 200;
    player.y = 525;
    player.velcoityY = 15;
    coins.x = Math.round(random(1300, 1600));
    coins.y = 320;
    laserMan.visible = false;
    spike.x = Math.round(random(1300, 2600));
    var a = Math.round(random(1,2));
    switch(a){
      case 1: spike.y = 62.5
      spike.addImage(spikesImgDown)
        break;
      case 2: spike.y = 537.5
      spike.addImage(spikesImgUp)
        break;
      default:break;
    }
    gaps.x = Math.round(random(1300, 2600));
    var b = Math.round(random(1,2))
    b = Math.round(random(1,2));
      gaps.x = 1300;
      switch(b){
        case 1: gaps.y = 574
          break;
        case 2: gaps.y = 26
          break;
        default:break;
      }
    }
  //everything that happens in the game
  if(gameState == "play"){
    //playing the music
    playMusic.play();
    //updating the score
    textFont("monospace")
    if(frameCount%5==0){
      score++;
    }
    if(player.y > 525){
      player.velocityX = 0;
      player.y = 525
    }
    //setting the velocities for the obstacles and coins
    spike.velocityX = - 25;
    gaps.velocityX = - 25;
    coins.velocityX = -25;
    //moving the coins in a sine wave
    coinSine = coinSine + 0.1
    coins.y = 100*Math.sin(coinSine)+320
    //bringing everything except the particles to the front
    player.depth = player.depth + 1;
    spike.depth = spike.depth + 1;
    gaps.depth = gaps.depth + 1;
    coins.depth = coins.depth + 1;
    laser.depth = laser.depth + 1;
    laserMan.depth = laserMan.depth + 1;
    //setting the border positions
    border1.y = 25;
    border2.y = 625;
    //resetting the positions of all obstacles and coins after they go off screen
    if(spike.x < -50){
      spike.x = 1600;
      i = Math.round(random(1,2));
      switch(i){
        case 1: spike.y = 62.5
        spike.addImage(spikesImgDown)
          break;
        case 2: spike.y = 537.5
        spike.addImage(spikesImgUp)
          break;
        default:break;
      }
    }
    if(gaps.x < -50){
      i = Math.round(random(1,2));
      gaps.x = 1300;
      switch(i){
        case 1: gaps.y = 574
          break;
        case 2: gaps.y = 26
          break;
        default:break;
      }
    }
    if(coins.x < -50){
      coins.visible = true;
      coins.x = 1300;
      coins.y = 320;
    }
    //shooting the laser
    laserShot();
    if(laserWait > 0){
      laserWait--;
    }
    if(laserWait == 0 && (laser.height == 5 || laser.height == 0.01)){
      
      laser.height = 30
      laserMan.y = laserMan.y + 13
      laserMan.addImage(laserShooting)
      laserWait = 50;
    }
    if(laserWait == 0 && laser.height == 30){  
      laser.height = 0.01
      laserMan.y = laserMan.y - 13
      laserMan.addImage(laserIdle)
      laserWait = 100;
      laserMan.velocityX = 20;
      laserMan.visible = true;
    }
    if(laser.height == 0.01 && laserWait == 49){
      laser.height = 5;laserMan.velocityX = 0;
      laserMan.x = 1140;
    }
    if(laserWait == 75){
      laserMan.y = Math.round(random(150, 450))
      laserMan.velocityX = -20;
    }
    //hard-coding a fix to a bug with the laser not showing up properly in front of the alien
    if( laser.height == 5){
      laserMan.y = laser.y + 40
    }
    console.log(laser.height)
    if(laser.height == 30){
      laserMan.y = laser.y + 53;
    }
    //moving the player up on the up arrow
    if(keyDown(UP_ARROW)){
      player.velocityY = player.velocityY - 3;
    }
    //fastfalling on the down arrow
    if(keyDown(DOWN_ARROW)){
      player.velocityY = player.velocityY + 2;
    }
      player.velocityY = player.velocityY + 1
    //respawn countdown
    if(respawnCountdown > -1){
      respawnCountdown --;
    }
    else{
      respawnCountdown = 0
    }
    //collecting the coins
    if(player.isTouching(coins)){
      coins.x = -100;
      coinSound.play();
      coinsCollected ++;
      score = score + 15;
    }
    //collision detection with the borders
    player.collide(border1);
    player.collide(border2);
    //spawning the particles
    if(frameCount%10 == 0){
    spawnParticles();
    }
    
  }
  //displaying the game over screen
  if(gameState == "end"){
    playMusic.pause();
    playerLabel.visible = false;
    textFont("monospace")
    fill("#FF7276")
    textSize(40);
    text("Game Over", 200, 200)
    textSize(20);
    fill("grey")
    text("[Press Space to restart]", 200, 240)
  }
  //setting the gamestate to "end" when the player hits one of the obstacles
  if(player.isTouching(spike) || player.isTouching(gaps) || (player.isTouching(laser) && laser.height == 30) || player.x < 0){
    gameState = "end";
    player.visible = false;
    endSound.loop = false;
    endSound.play();
  }
  //drawing everything
  drawSprites();
}
//the function that spawns the particles
function spawnParticles(){
  particles = createSprite(1300,Math.round(random(65, 540)),200,10);
  particles.shapeColor = 105;
  particlesGroup.add(particles);
  particlesGroup.setVelocityXEach(-15);
  particlesGroup.setLifetimeEach(100);

  }

function laserShot(){
  if(frameCount%150 == 0){
    laser.y = laserMan.y-40
    laser.visible = true
    laserWait = 50;
  }
  //+53 for shooting, +40 for idle, 30 laser height
}