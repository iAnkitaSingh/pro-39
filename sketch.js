var PLAY = 1;
var END = 0;
var gameState = PLAY;

var lion, lion_running, lion_collided;
var background, invisiblebackGround, backgroundImage;

var cloudsGroup, cloudImage;
var Stone , stoneGroup

var score=0;

var gameOver, restart;


function preload(){
  lion_running =   loadAnimation("lion1.png");
  lion_collided = loadAnimation("lion_collided.png");
  Stone = loadImage("stone.png");

  backgroundImage = loadImage("background.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  cloudImage = loadImage("cloud.png")


  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(800, 800);
  
  lion = createSprite(10,100,25,2);
  lion.addAnimation("running", lion_running);
  lion.addAnimation("collided", lion_collided);
  lion.scale = 0.08;
  
  background = createSprite(400,400,800,800);
  background.addImage("background",backgroundImage);
  background.x = background.width /2;
  background.velocityX = -2
  background.scale= 2
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,700,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}

function draw() {
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && lion.y >= 159) {
      jumpSound.play();
      lion.velocityY = -10;
    }
  
    lion.velocityY = lion.velocityY + 0.4
  
    if (background.x < 100){
      background.x = background.width/2;
    }
  
    lion.collide(invisibleGround);
    spawnClouds();
    spawnStone();
   
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(stoneGroup.isTouching(lion)){
      dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    lion.velocityY = 0;
    stoneGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the lion animation
    lion.changeAnimation("collided",lion_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    stoneGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  fill("black")
  text("Score: "+ score, 500,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,120,40,10);
    cloud.y = Math.round(random(50,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -2;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = lion.depth;
    lion.depth = lion.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnStone() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(800,650,100,40);
    stone.addImage(Stone)
    stone.scale = 0.1
    stone.velocityX = -2
    
    
    //assign scale and lifetime to the stone         
    stone.lifetime = 500;
    //add each cloud to the group
    stoneGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX  = -2
  gameOver.visible = false;
  restart.visible = false;
  
  cloudsGroup.destroyEach();
  stoneGroup.destroyEach();
  
  lion.changeAnimation("running",lion_running);
  
  score = 0;
  
}
