var ground,player;
var monster,meteor,monsterImg,meteorImg,meteorGroup,playerLives=3
var monsterLives=1;
var bg2Img,gameState = 0;
var count =0;

var ans, ropeObj,x;
var scale,scaleImg

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ropeObj, fruit, fruit_con;
var blue_button

function preload(){
  bg1 = loadImage("background.jpg");
  playerImg = loadImage("player.png");
  monsterImg=loadImage("creeper.png")
  meteorImg=loadImage("meteor.png");
  block1Img = loadImage("block1.png");
  block2Img = loadImage("block2.png");
  bg3Img = loadImage("bg3.jpeg");
  bg2Img=loadImage("background2.jpg")
  scaleImg=loadImage("scales.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  ground = createSprite(width/2, height/2, width+100, height);
  ground.addImage(bg1);
  ground.scale =2.5;
  ground.velocityX = -2;

  ground2 = createSprite(width/2, height-20, width+100, 20);  

  player = createSprite(200, height-170);
  player.addImage(playerImg);
  player.scale = 0.5;
  player.velocityX=6

scales=createSprite(width/2,height+50)
  scales.addImage(scaleImg)
  scales.scale=3
  scales.visible=false
  

meteorGroup= new Group()



monster=createSprite(-50,height-170)
monster.addImage(monsterImg)
monster.scale=0.8
monster.velocityX=6

ques = new Question();

ropeObj = new Rope(6,{x:200,y:200});

fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(ropeObj.body,fruit);

  fruit_con = new Link(ropeObj,fruit);

  ellipseMode(RADIUS);
  rectMode(CENTER);

}

function draw() {
  background("pink"); 
Engine.update(engine);

if(gameState === 0){

  if(keyDown(RIGHT_ARROW)){
    player.velocityX+=2
    monster.velocityX+=2
    }


  if(keyDown(LEFT_ARROW)) {
player.velocityX-=2

 }

  if(ground.x <width/2 - 150){
        ground.x = width/2;
  }
    
      player.collide(ground2);
      monster.collide(ground2)
  //player control
  if(keyDown("space")){
    player.velocityY = -12;
    monster.velocityY=-12
  } 

//gravity
  player.velocityY += 0.5;
  monster.velocityY+=0.5

//resetting the player's and monster's position
  if(player.x>width) {
    player.x=200
   
     }
   
   if(monster.x>width) {
   monster.x=-50
   
   }

if(monster.isTouching(player)) {
playerLives-=1;

}

//player.overlap(meteorGroup, function(collector, collected){

 // playerLives -=1;

  //collected.remove();
//})


monster.collide(meteorGroup, function(collector, collected){
  playerLives -=1;

  collected.remove();

  count +=1;
})
if(meteorGroup.isTouching(player)) {
gameOver()

}

if(playerLives===0) {
stop();
gameOver();

}


  spawnMeteors();

  drawSprites();




  textSize(50)
  fill("black")
  text("Lives:"+playerLives,width-200,100)
  
  text("Meteor touched the monster: "+ count + " times",20,100);

  if(count === 1){
    gameState =1;
    
  }

}

    if(gameState ===1){
      
      background(bg2Img);

      ques.display();
      ques.handleButton();
      
      if(ans){
        gameState = 2;
        victory()
      }
      else if(x === "2"){
        gameState = "end";
      }
      else if(x === "3"){
        gameState = "end";
      }
      else if(x === "4"){
        gameState = "end";
      }

    }
    if(fruit.isTouching(scales)) {
swal({
  title:"You beat the Game!",text:"You beat the monster called Kang with the meteors you summoned, answered the riddle to get into his domain and completed the puzzle. Now you can feed your family."
//imageUrl:"https://www.google.com/search?q=diamond+minecraft&rlz=1C1CHBF_en-GBGB910GB911&sxsrf=APq-WBvdRER2G4eovBlKNhveRjs1I7QOig:1646067722369&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjRoviO8KL2AhVQecAKHZPDBX0Q_AUoAXoECAEQAw&biw=1366&bih=625&dpr=1#imgrc=X88gH9j_i-MtzM"
//imageSize: "100x100", confirmButtonText: "More levels coming soon?....."
})
    }

if(gameState === 2){
  ques.hide();
  image(bg3Img,0,0,width,height);
   scales.visible=true
  button = createImg('button.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ropeObj.show();

  image(block2Img,fruit.position.x, fruit.position.y, 70,70);
}

if(gameState === "end"){
  gameOver();
}
}
function spawnMeteors() {
  if(frameCount%100===0) {
  meteor=createSprite(random(10,width-100),0,50,50)
  meteor.velocityY=10
  meteor.addImage(meteorImg)
  meteor.scale=0.5
  meteorGroup.add(meteor)
  
  
  }
  
  
  
  }
  function gameOver()
  { swal({
    title: `Game Over`, text: "You failed the level!!!",
 
 imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100", confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm){
    window.location.reload()
  }); }



   function stop() {
meteorGroup.destroyEach()
//player.remove()
monster.remove()


   }
   function victory()
   { swal({
     title: `Well Done`, text: "Proceed to the next level....!!!",
  
  imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Fthumbs-up-people-joypixels-approved-agreed-gif-17522439&psig=AOvVaw0i6RPw9YKVmHWKICh-w2UX&ust=1645350731328000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjj4qG_i_YCFQAAAAAdAAAAABAN",
   imageSize: "100x100", confirmButtonText: "Move onto the Next Level!"
   }); }  

   function drop(){

    ropeObj.break();
  fruit_con.detach();
  fruit_con = null; 
   }

   