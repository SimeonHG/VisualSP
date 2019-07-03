const controls = {
  view: {x: 0, y: 0, zoom: 1},
  viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

let canvas;
let drawn = false;
let grid;
let aisles = [];

let windowFactor = {
    width: 0.95,
    height: 0.94
}

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos;

function draw() {
    background(255);
    Controls.move(controls).keyboardMovement();
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);
    grid.draw();
    for (let aisle of aisles) {
        aisle.draw();
        if (Settings.viewModes().includes("show-segments")) {
            aisle.segments.forEach((s) => s.draw());
        }
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
    if (mouseButton === LEFT) {
        if(Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select") {
            Selection.begin();
            Selection.update();
        } else if(Settings.mode == "movement"){
            Controls.move(controls).mousePressed();
        }
    }
}

function mouseDragged() {
    if(Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select"){
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
            if (aisle.collisions().length > 0) {
                aisle.destroy();
            }
            aisles.push(aisle);
        }
    } else if (Settings.mode == "segments") {
        let segmentCoords = Selection.end();
        if (segmentCoords) {
            let segment = new Segment(segmentCoords.start, segmentCoords.end);
            //TODO: Optimize this
            aisles.forEach(aisle => {
                if (segment.isInside(aisle)) {
                    // console.log("isInside");
                    aisle.segments.push(segment);
                    segment.attach(aisle);
                    if (segment.invalid()) {
                        console.log( "INVALID SEGMENT");
                        aisle.segments.splice(aisle.segments.indexOf(segment), 1);
                    }
                }
            });
        }
    } else if(Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    } else if(Settings.mode == "select") {
        for(let aisle of aisles) {
            aisle.deselect();
        }
        let aisleCoords = Selection.end();
        if (aisleCoords) {
            let aisle = new Aisle(aisleCoords.start, aisleCoords.end);
            for(let col of aisle.collisions()) {
                col.select();
            }
        }
    }
}
