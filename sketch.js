var mario,Coin1;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation,coinImg;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
var score = 0;
function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
  coinImg=loadAnimation("images/coin.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  score=0
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  coinGroup=createGroup()
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      Coin1=new coin(countDistanceX);
      coinGroup.add(Coin1.spt)
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(countDistanceX-150,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,3300);

  Coin1=createSprite(this.rx,this.ry)
  Coin1.setCollider("circle")


  score.scale = 23
  
}

function draw() {
  background('skyblue');
  //code to move the camera
    fill("black")
  textSize(23)
text("score : "+ score, 350,30)
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
          //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up")) 
        {
          mario.jump();
        }

   }

   if(mario.spt.y>height || mario.spt.isTouching(obstacleGroup)){
     gameState= LOSE
   }

   if(mario.spt.isTouching(flag)){
     gameState= WIN
   }

  if(gameState==LOSE)//END State
  {   
    mario.spt.setVelocity(0,0)
    obstacleGroup.destroyEach()
    mario.spt.pause()
    textSize(100)
    fill("red")
    text("Game Over", mario.spt.x,300)
  }

  if(gameState==WIN)//WIN state
  {  
    textSize(100)
    fill("green")
    text("You Win", mario.spt.x,300)
    mario.spt.setVelocity(0,0)
  }
  if(mario.spt.isTouching(coinGroup)){
  score=score+1
  }
  

   drawSprites();
}



