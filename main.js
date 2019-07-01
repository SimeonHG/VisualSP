

let windowFactor = {
    width: 0.95,
    height: 0.94
}

let grid;

function setup() {
    createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(5, 5);
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

function draw() {
    background(255);
    grid.draw();
    
}

function keyPressed() {

	EventListener.addKey(keyCode);
}

function keyReleased() { 
	EventListener.removeKey(keyCode);
	console.log(EventListener.getKeys());
}

function mousePressed() {
  console.log("click");
  ellipse(mouseX, mouseY, 5, 5);
  // prevent default
  return false;
}

function mouseClicked() {
    console.log(grid.getClickedSquare());
}
