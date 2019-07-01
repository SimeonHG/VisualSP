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

function mouseClicked() {
    console.log(grid.getClickedSquare());
}
