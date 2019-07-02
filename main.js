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
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos;

function draw() {
    background(255);
    camera.apply();
    grid.draw();
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
