const controls = {
  view: {x: 0, y: 0, zoom: 1},
  viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

let canvas;
let drawn = false;

let windowFactor = {
    width: 0.95,
    height: 0.94
}

let grid;
let aisle;

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));

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

    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);
    clear();
    grid.draw();

    drawn = true;
    

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


class Controls{
    static zoom(controls){
        function worldZoom(e){
            const {x, y, deltaY} = e;
            const direction = deltaY > 0 ? -1 : 1;
            const factor = 0.05;
            const zoom = 1*direction*factor;

            const wx = (x-controls.view.x)/(width*x-controls.view.zoom);
            const wy = (y-controls.view.y)/(height*y-controls.view.zoom);

            controls.view.x -= wx*width*zoom;
            controls.view.y -= wy*height*zoom;
            controls.view.zoom += zoom;
        }
        return{worldZoom}

    }
}


