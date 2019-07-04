const controls = {
  view: {x: 0, y: 0, zoom: 1},
  viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

let canvas;
let drawn = false;
let grid;
let aisles = [];

let selectedItems = [];
let movingSelectedItems = false;
let lastX = null;
let lastY = null;

let windowFactor = {
    width: 0.98,
    height: 0.83
}

let input;

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));
    translate(-width/2, -height/2);
}
function typeLabel(){
    new Label(0, 0, "asddsa").draw();
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

let startPos, currentPos;
let isCentered = false;
function draw() {
    background(255);
    Controls.move(controls).keyboardMovement();
    translate(width / 2, height / 2);
    scale(controls.view.zoom);
    translate(controls.view.x, controls.view.y);
    grid.draw();
    for (let aisle of aisles) {
        aisle.draw();
    }
    Selection.draw();
}

function copySelected() {
    let newObj;
    let newSelection = [];
    for (let item of selectedItems) {
        item.deselect();
        selectedItems.splice(selectedItems.indexOf(item), 1);
        if (item instanceof Aisle) {
            newObj = new Aisle(item);
            newObj.setpos(createVector(0, 0));
            aisles.push(newObj);
        }
        else if (item instanceof Segment) {
            newObj = new Segment(item);
            newObj.start = {x: 0, y: 0};
            newObj.end = ({x: newObj.start.x + newObj._width, y: newObj.start.y + newObj._height});
            item._aisle.segments.push(newObj);
        }
        newSelection.push(newObj);
    }

    for (let item of newSelection) {
        item.select();
    }
}

function deleteSelected() {
    for(let item of selectedItems) {
        item.remove();
    }
}

function keyPressed() {
    if(keyCode == 46)
        deleteSelected();
	EventListener.addKey(keyCode);
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);

    let keys = EventListener.getKeys();
    if(keys.includes("CTRL") && keys.includes("C")) {
        copySelected();
    }
}

function keyReleased() {
	EventListener.removeKey(keyCode);
}

function clickedOnSelected() {
    for (let selection of selectedItems) {
        if (selection.isClicked()) {
            return true;
        }
    }
    return false;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        if (selectedItems.length > 0 && clickedOnSelected()) {
            movingSelectedItems = true;
            lastX = mouseX;
            lastY = mouseY;
        } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select") {
            for (let aisle of aisles) {
                aisle.deselect();
            }
            selectedItems = [];
            Selection.begin();
            Selection.update();
        } else if (Settings.mode == "movement"){
            Controls.move(controls).mousePressed();
        }
    }
}

function mouseDragged() {
    if (movingSelectedItems) {
        for (let item of selectedItems) {
            item.move(createVector(mouseX - lastX, mouseY - lastY));
        }
        lastX = mouseX;
        lastY = mouseY;

    } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select") {
        Selection.update();
    } else if (Settings.mode == "movement"){
       Controls.move(controls).mouseDragged();
    }
}

function mouseReleased() {
    movingSelectedItems = false;
    selectedItems.map((e) => e.snapAll())

    if (Settings.mode == "aisles") {
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
            for (let aisle of aisles) {
                if (segment.isInside(aisle)) {
                    segment.attach(aisle);
                    if (segment.collisions().length > 0) {
                        segment.remove();
                    }
                }
            }
        }
    } else if(Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    } else if(Settings.mode == "select") {
        if (mouseY > 0) {
            let coords = Selection.end();
            if (coords) {
                let selection = new Entity(coords.start, coords.end);
                let collAisle = selection.collisions(aisles);
                // let collArea = selection.collisions(areas);

                let coll = collAisle[0];

                if (!coll) {
                    return;
                }

                if (selection.isInside(coll)) {
                    let segment = new Segment(coords.start, coords.end);
                    segment.attach(coll);
                    if (segment.collisions().length > 0) {
                        for (let seg of segment.collisions(segments)) {
                            seg.select();
                        }
                        segment.remove();
                        return;
                    }
                    segment.remove();
                }
                for (let col of collAisle) {//.concat(collArea)) {
                    col.select();
                }
            }
        }
    }
}
