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
    background(255);
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);
    
    
    camera.apply();
    grid.draw();
    for (let aisle of aisles) {
        aisle.draw();
        aisle.segments.forEach((s) => s.draw());
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
    if (mouseButton === LEFT && (Settings.mode == "aisles" || Settings.mode == "segments")) {
        Selection.begin();
        Selection.update();
    }
    if(mouseButton === LEFT && Settings.mode == "movement"){
        Controls.move(controls).mousePressed();
    }

}

function mouseDragged() {
    if(Settings.mode == "aisles" || Settings.mode == "segments"){
      Selection.update();
    }
    if(Settings.mode == "movement"){
       Controls.move(controls).mouseDragged();
    } 

}

function mouseReleased() {
    if(Settings.mode == "aisles") {
        let aisleCoords = Selection.end();
        if (aisleCoords) {
            aisle = new Aisle(aisleCoords.start, aisleCoords.end);
            aisles.push(aisle);
        }
    } else if (Settings.mode == "segments") { 
        let segmentCoords = Selection.end();
        if (segmentCoords) {
            let segment = new Segment(segmentCoords.start, segmentCoords.end);
            //TODO: Optimize this
            aisles.forEach(aisle => {
                if (segment.isInside(aisle)) {
                    aisle.segments.push(segment);
                }
            });
        }
    }
    else if(Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    }
}



