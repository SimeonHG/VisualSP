

let windowFactor = {
    width: 0.95,
    height: 0.94
}

let grid;
let aisles = [];

function setup() {
    createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(200, 200);
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos;

function draw() {
    background(255);
    grid.draw();
    for (let aisle of aisles) {
        aisle.draw();
    }
    Selection.draw();

    if (aisles[0] && aisles[1]) {
        console.log(aisles[0].collides(aisles[1]));
    }
}

function mousePressed() {
    Selection.begin();
}

function mouseDragged() {
    Selection.update();
}

function mouseReleased() {
    let aisleCoords = Selection.end();
    let aisle = new Aisle(aisleCoords.start, aisleCoords.end);
    if (aisle.invalid()) {
        aisle.remove();
    } else {
        aisles.push(aisle);
    }
}
