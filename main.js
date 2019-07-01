var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.005;
var translateX;
var translateY;
 
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
  translateX = width/2;
  translateY = height/2;
 
}
function draw() {
  background(237, 34, 93);
  translate(translateX,translateY);
  fill(0);
  scale(zoom);
  rect(0, 0, 50, 50);
}
 
//function mouseWheel(event) {
 // zoom += sensativity * event.delta;
 // zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  //return false;
//}

function mouseWheel(event){
  zoom -= event.delta / 100;
 
  translateX += event.delta * mouseX/50;
 
  translateY += event.delta * mouseY/50;
}