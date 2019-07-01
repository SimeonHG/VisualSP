

let windowFactor = {
    width: 0.95,
    height: 0.94
}

let grid;
let aisle;

function setup() {
    createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(200, 200);
<<<<<<< HEAD
=======
    aisle = new Aisle(createVector(0, 0), createVector(80, 80));
>>>>>>> 69ab9a435bef44b80cd9814fcfea50370b1183b7
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos, endPos;

function drawSelection(start, end) {
    push();
    fill(255, 0, 0, 80);
    noStroke();
    rect(startPos.x, startPos.y, currentPos.x - startPos.x + Square.width, currentPos.y - startPos.y + Square.width);
    pop();
}

function draw() {
    background(255);
    grid.draw();
<<<<<<< HEAD
    if (startPos && currentPos) {
        drawSelection(startPos, currentPos);
    }
}

function mousePressed() {
    startPos = grid.getClickedSquare();
}

function mouseDragged() {
    currentPos = grid.getClickedSquare();
=======
    aisle.draw();
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
>>>>>>> 69ab9a435bef44b80cd9814fcfea50370b1183b7
}

function mouseReleased() {
    console.log(startPos, currentPos);
    startPos = undefined;
    currentPos = undefined;
}
