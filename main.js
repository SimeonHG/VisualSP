const controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
}

let canvas;
let drawn = false;
let grid;
let aisles = [];
let zones = [];

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
    controls.view.x = - width / 2;
    controls.view.y = - height / 2;
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
    for (let zone of zones) {
        zone.draw();
    }
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
        if (item instanceof Segment) {
            newObj = new Segment(item);
            newObj.start = { x: 0, y: 0 };
            newObj.end = ({ x: newObj.start.x + newObj._width, y: newObj.start.y + newObj._height });
            item._aisle.segments.push(newObj);
        } else {
            if (item instanceof Aisle) {
                newObj = new Aisle(item);
                aisles.push(newObj);
            } else if (item instanceof Zone) {
                newObj = new Zone(item);
                zones.push(newObj);
            }
            newObj.setpos(createVector(0, 0));
        }
        if (!newObj.invalid()) {
            newSelection.push(newObj);
        }
    }
    selectedItems = [];

    for (let item of newSelection) {
        item.select();
    }
}

function deleteSelected() {
    for (let item of selectedItems) {
        item.remove();
    }
}

function keyPressed() {
    if (keyCode == 46)
        deleteSelected();
    EventListener.addKey(keyCode);
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);

    let keys = EventListener.getKeys();
    if (keys.includes("CTRL") && keys.includes("C")) {
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

function getSelectedItems(coords) {
    if (!coords) {
        return;
    }

    let selection = new Entity(coords.start, coords.end);

    let collAisle = selection.collisions(aisles);
    let collZone = selection.collisions(zones);

    let aisle = collAisle[0];
    let zone = collZone[0];

    if (aisle && selection.isInside(aisle)) {
        let segment = new Segment(coords.start, coords.end);
        segment.attach(aisle);
        if (segment.collisions().length > 0) {
            let colls = segment.collisions(aisle.segments);
            segment.remove();
            return colls;
        }
        segment.remove();
    }

    if (zone && selection.isInside(zone)) {
        if (collAisle.length > 0) {
            return collAisle;
        }
    }

    return collAisle.concat(collZone);
}

function mousePressed() {
    if (mouseButton === LEFT) {
        if (selectedItems.length > 0 && clickedOnSelected()) {
            movingSelectedItems = true;
            lastX = mouseX;
            lastY = mouseY;
        } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select" || Settings.mode == "zones") {
            for (let entity of aisles.concat(zones)) {
                entity.deselect();
            }
            selectedItems = [];
            Selection.begin();
            Selection.update();
        } else if (Settings.mode == "movement") {
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

    } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select" || Settings.mode == "zones") {
        Selection.update();
    } else if (Settings.mode == "movement") {
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
    } else if (Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
<<<<<<< HEAD
    } else if(Settings.mode == "select") {
        if (mouseY > 0 && mouseButton === LEFT) {
            let collisions = getSelectedItems(Selection.end());
            for (let col of collisions) {
                col.select();
=======
    } else if (Settings.mode == "select") {
        if (mouseY > 0) {
            let coords = Selection.end();
            if (coords) {
                let selection = new Entity(coords.start, coords.end);
                let collAisle = selection.collisions(aisles);
                let collZone = selection.collisions(zones);

                let coll = collAisle[0];

                if (coll && selection.isInside(coll)) {
                    let segment = new Segment(coords.start, coords.end);
                    segment.attach(coll);
                    if (segment.collisions().length > 0) {
                        for (let seg of segment.collisions(coll.segments)) {
                            seg.select();
                        }
                        segment.remove();
                        return;
                    }
                    segment.remove();
                }

                for (let col of collAisle.concat(collZone)) {
                    col.select();
                }
>>>>>>> 2190388e2c250c943236769bbf53afbb028e4c17
            }
        }
    } else if (Settings.mode == "zones") {
        let zoneCoords = Selection.end();
        if (zoneCoords) {
            zone = new Zone(zoneCoords.start, zoneCoords.end);
            if (zone.collisions().length > 0) {
                zone.destroy();
            }
            zones.push(zone);
        }

    }
}