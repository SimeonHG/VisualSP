const controls = {
  view: {x: 0, y: 0, zoom: 1},
  viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

let canvas;
let drawn = false;
let grid;
let aisles = [];
let camera;

let windowFactor = {
    width: 0.95,
    height: 0.94
}

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));

    camera = new Camera(10);
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos;

function draw() {
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);
    
    background(255);
    camera.apply();
    grid.draw();
    for (let aisle of aisles) {
        aisle.draw();
    }
    Selection.draw();
}

function keyPressed() {
	EventListener.addKey(keyCode);
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);
}

function keyReleased() {
	EventListener.removeKey(keyCode);
}

function mousePressed() {
    Selection.begin();
    Selection.update();
}

function mouseDragged() {
    Selection.update();
}

function mouseReleased() {
    let aisleCoords = Selection.end();
    if (aisleCoords) {
        let aisle = new Aisle(aisleCoords.start, aisleCoords.end);
    // if (aisle.invalid()) {
    //     aisle.remove();
    // } else {
        aisles.push(aisle);
    // }
    }
}


class Controls {
    static zoom(controls) {
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
