var bg
var girl1,girl2,coin1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,road;
var road1;
var invisibleGround;
var sign,restart,pit,pit2,tree;
var gameState="play";
var groupObstacles,groupCoins;
var score=0;

function setup() {
  createCanvas(800,400);
  road1=createSprite(400,200)
  road1.addImage(road)
  road1.scale=1.30
  girl_1=createSprite(70,270)
  girl_1.addAnimation("girl",girl1)
  girl_1.addAnimation("falling",girl2)
  girl_1.scale=0.4
  invisibleGround=createSprite(400,370,800,20)
  invisibleGround.visible=false
  groupCoins = createGroup();
  groupObstacles = createGroup();
  girl_1.setCollider("circle",0,0,200);
  girl_1.debug=true
}

function preload(){
  girl1=loadAnimation("girl_1.png","girl_2.png","girl_3.png")
  girl2=loadAnimation("girl_4.png")
  coin1=loadImage("coin.png")
  obstacle3=loadImage("obstacle3.png")
  sign=loadImage("sign.png")
  road=loadImage("road.png")
  pit=loadImage("pit.png")
  pit2=loadImage("pit2.png")
  tree=loadImage("tree.png")

}

function draw() {
  background("red"); 
  if(gameState==="play"){
    road1.velocityX=-9
    if (road1.x < 0){
      road1.x = road1.width/2;
    }
    if(keyDown("UP_ARROW")) {
      girl_1.velocityY = -12;
  }
  girl_1.velocityY = girl_1.velocityY + 0.8
  spawnCoins()
  spawnObstacles() 
  if(girl_1.isTouching (groupObstacles)){
    gameState="end"
  }
  for (var a = 0; a < groupCoins.length; a++) {
    if (girl_1.isTouching(groupCoins.get(a))) {
    groupCoins.get(a).destroy();
    score=score+20;
     }
    }
  }

 if(gameState==="end"){
  road1.velocityX=0
  groupCoins.setVelocityXEach(0)
  groupObstacles.setVelocityXEach(0); 
  groupObstacles.setLifetimeEach(-1);
  groupCoins.setLifetimeEach(-1);
  girl_1.changeAnimation("falling",girl2)
  girl_1.setCollider("circle",0,0,100);
}
girl_1.collide(invisibleGround);
  drawSprites();
  fill("yellow")
  textSize(20)
  text("Score "+score,700,50)
}

function spawnCoins() {
  
  //write code here to spawn the clouds
 if (frameCount % 120 === 0) {
    var coin = createSprite(800,120,40,10);
    coin.y = Math.round(random(80,120));
    coin.addImage(coin1);
    coin.scale = 0.5;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 500;
    
    //adjust the depth
   // cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    //cloudsGroup.add(cloud);
    groupCoins.add(coin);
  }
}

function spawnObstacles(){
 
  if (frameCount % 180 === 0){
    var obstacle = createSprite(750,320,10,10);
    obstacle.velocityX= -3 
    
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: obstacle.addImage(pit);
               break;
       case 2: obstacle.addImage(pit2);
               break;
       case 3: obstacle.addImage(sign);
               break;
       case 4: obstacle.addImage(obstacle3);
               break;
       case 5: obstacle.addImage(tree);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.3;
     obstacle.lifetime = 400;
     groupObstacles.add(obstacle);
    

  }
 }