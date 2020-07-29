var dog,sadDog,happyDog, database;
var foodS,foodStock;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(400,400);
  dog=createSprite(200,200,50,50);
  dog.addImage("sad",sadDog);

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);


}

function draw() {
  background(0);
  if(keyWentDown("SPACE")){
    writeStock(foodS);
    dog.addImage("happy",happyDog);
  }

  drawSprites();
  text("Food Remaining"+foodS,100,100);
  
}

function readStock(data){
  foodS=data.val();

}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  });

}
