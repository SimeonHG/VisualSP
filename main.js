let windowFactor = {
    width: 0.95,
    height: 0.94
}

function setup() {
    createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

function draw() {
    background(255);
}
