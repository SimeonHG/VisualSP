

let windowFactor = {
    width: 0.95,
    height: 0.94
}

let grid;
let aisle;

function setup() {
    createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(200, 200);
    aisle = new Aisle(createVector(0, 0), createVector(80, 80));
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
    if (startPos && currentPos) {
        drawSelection(startPos, currentPos);
    }
}

function mousePressed() {
    startPos = grid.getClickedSquare();
}

function mouseDragged() {
    currentPos = grid.getClickedSquare();
}

function mouseReleased() {
    console.log(startPos, currentPos);
    startPos = undefined;
    currentPos = undefined;
}
