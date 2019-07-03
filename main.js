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

let input;

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));

    camera = new Camera(10);

    input = createInput();
    input.position(20, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(typeLabel());
    

}
function typeLabel(){
    new Label(0, 0, "asddsa").draw();
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
    if (mouseButton === LEFT && (Settings.mode == "aisles" || Settings.mode == "segments")) {
        Selection.begin();
        Selection.update();
    }
    if(mouseButton === LEFT && Settings.mode == "movement"){
        Controls.move(controls).mousePressed();
    }
    if(mouseButton === LEFT && Settings.mode == "label"){
        new Label().draw;
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
            if (aisle.invalid()) {
                console.log("invalid aisle");
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
    }
    else if(Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    }
}
