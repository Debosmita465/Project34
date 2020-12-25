//Create variables here
var database, dog, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  rectMode(CENTER);
  
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
if(foodS !== undefined)
  fill("yellow");
textSize(25);
text("note: Press up arrow key to feed the dog", 25,100);

  textSize(35);
  text("Food remaining:"+foodS,100,200);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



