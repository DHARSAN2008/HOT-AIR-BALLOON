var ballon;
var database;
var position;
function preload(){
  bImage=loadImage("b.png")
  baImage=loadImage("b1.png")
  balloonImage=loadAnimation("b1.png","b2.png","b3.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon=createSprite(400, 400, 1, 1);
  balloon.addAnimation("baImage",balloonImage)
  balloon.scale=0.4

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition);

}

function draw() {
  background(bImage);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
    balloon.addAnimation("baImage",balloonImage)
  
    }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(+10,0);
    balloon.addAnimation("baImage",balloonImage)
    
    }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("baImage",balloonImage)
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    balloon.addAnimation("baImage",balloonImage)
    balloon.scale=balloon.scale+0.01;  }

  drawSprites();
}

function readPosition(data){
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

