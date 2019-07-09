const controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
}

const currentRoute = {
    start: null,
    end: null
}

let canvas;
let drawn = false;
let grid;

let selectedItems = [];
let movingSelectedItems = false;
let lastX = null;
let lastY = null;

let offsetX = 0;
let offsetY = 0;

let draggingForMovement = false;

let windowFactor = {
    width: 0.98,
    height: 0.83
}

let input;
let picker;

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));
    controls.view.x = -width / 2;
    controls.view.y = -height / 2;

    picker = new Picker(grid.squares[0][0], grid.squares[8][8]);
}

function windowResized() {
    resizeCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
}

function mouseIsInsideCanvas() {
    return mouseX <= canvas.width && mouseY <= canvas.height && mouseX >= 0 && mouseY >= 0;
}

let startPos, currentPos;
let isCentered = false;


function mouseIsInsideCanvas() {
    return mouseX <= canvas.width && mouseY <= canvas.height && mouseX >= 0 && mouseY >= 0;
}

function draw() {
    background(255);
    if (draggingForMovement && (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select" || Settings.mode == "zones") && mouseIsInsideCanvas()) {
        Controls.move(controls).moveEdged(canvas);
    }
    if (Settings.mode != "typing") {
        Controls.move(controls).keyboardMovement();
    }
    translate(width / 2, height / 2);
    scale(controls.view.zoom);
    translate(controls.view.x, controls.view.y);
    for (let zone of Zone.zones) {
        zone.draw();
    }
    grid.draw();
    for (let aisle of Aisle.aisles) {
        aisle.draw();
        if (!aisle.isInvalid()) {
            aisle._placed = true;
        }
    }
    Selection.draw();
    picker.drawRoute();

    if (currentRoute.start !=null) {
        currentRoute.start.drawColor({
            r: 0,
            g: 200,
            b: 25
        });
    }
    if (currentRoute.end != null) {
        // console.log(currentRoute);
        currentRoute.end.drawColor({
            r: 15,
            g: 100,
            b: 200
        });
    }
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
        if (!newObj.isInvalid()) {
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

    let collAisle = selection.collisions(Aisle.aisles);
    let collZone = selection.collisions(Zone.zones);

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

function mousePressed(e) {
    if (mouseButton === LEFT) {
        if (selectedItems.length > 0 && clickedOnSelected()) {
            movingSelectedItems = true;
            lastX = mouseX;
            lastY = mouseY;
        } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select" || Settings.mode == "zones") {
            for (let entity of Aisle.aisles.concat(Zone.zones)) {

                entity.deselect();
            }
            selectedItems = [];
            Selection.begin();
            Selection.update();
        } else if (Settings.mode == "movement") {
            Controls.move(controls).mousePressed();
        } else if (Settings.mode == "routeSelect" && mouseIsInsideCanvas()) {
            currentRoute.start = grid.getClickedSquareObj();
        }
    } else if (mouseButton === CENTER) {
        if (Settings.mode == "routeSelect") {
                currentRoute.end = grid.getClickedSquareObj();
        }
    }
    return false;
}

function mouseDragged() {
    draggingForMovement = true;


    if (movingSelectedItems) {

        for (let item of selectedItems) {
            item._placed = false;
            item.move(createVector(mouseX - lastX - (offsetX * controls.view.zoom), mouseY - lastY - (offsetY * controls.view.zoom)));
            item.isInvalid();
        }
        lastX = mouseX;
        lastY = mouseY;
        offsetX = 0;
        offsetY = 0;

    } else if (Settings.mode == "aisles" || Settings.mode == "segments" || Settings.mode == "select" || Settings.mode == "zones") {
        if (!mouseIsInsideCanvas()) return;
        Selection.update();
    } else if (Settings.mode == "movement") {
        Controls.move(controls).mouseDragged();
    }
}

function mouseReleased() {
    draggingForMovement = false;
    movingSelectedItems = false;
    selectedItems.map((e) => e.place());

    if (Settings.mode == "aisles") {
        let aisleCoords = Selection.end();
        if (aisleCoords) {
            aisle = new Aisle(aisleCoords.start, aisleCoords.end);
            if (aisle.isInvalid()) {
                aisle.destroy();
            }
        }
    } else if (Settings.mode == "segments") {
        let segmentCoords = Selection.end();
        if (segmentCoords) {
            let segment = new Segment(segmentCoords.start, segmentCoords.end);
            //TODO: Optimize this
            for (let aisle of Aisle.aisles) {
                if (segment.isInside(aisle)) {
                    segment.attach(aisle);
                    if (segment.isInvalid()) {
                        segment.remove();
                    }
                }
            }
        }
    } else if (Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    } else if (Settings.mode == "select") {
        if (mouseY > 0 && mouseButton === LEFT) {
            let collisions = getSelectedItems(Selection.end());
            if (!collisions) {
                return;
            }
            for (let col of collisions) {
                col.select();
            }
        }
    } else if (Settings.mode == "zones") {
        let zoneCoords = Selection.end();
        if (zoneCoords) {
            zone = new Zone(zoneCoords.start, zoneCoords.end);
            if (zone.isInvalid()) {
                zone.destroy();
            }
        }
    } 
    return false;
}

function findRoute() {
    if (currentRoute.start != null && currentRoute.end != null) {
        picker = new Picker(currentRoute.start, currentRoute.end);
        picker.findRoute();
    } else {
        alert("Path not selected!");
    }
}