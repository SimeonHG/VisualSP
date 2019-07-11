const controls = {
    view: { x: 0, y: 0, zoom: 1 },
    viewPos: { prevX: null, prevY: null, isDragging: false },
}

const currentRoute = {
    start: null
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

let resizingEntity;

let windowFactor = {
    width: 0.98,
    height: 0.83
}

let input;
let picker;

let speedSlider;

function setup() {
    canvas = createCanvas(windowWidth * windowFactor.width, windowHeight * windowFactor.height);
    grid = new Grid(500, 500);
    canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e));
    controls.view.x = -width / 2;
    controls.view.y = -height / 2;


    speedSlider = createSlider(-16, 16, 0);
    speedSlider.position(width*0.45, height*0.05);
    // speedSlider.style('width', '80px');


    picker = new Picker(grid.squares[0][0], [{
        "location": "0"
    }]);
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
    let speed = speedSlider.value()
    Settings.timescale = speed;
    let pTime = document.getElementById("timescale");
    pTime.innerHTML = `${speed}x`;
    pTime.left = '35%';
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
    for (let node of Node.nodes) {
        node.draw();
    }
    Selection.draw();
    
    // picker.drawOpenList();
    // picker.drawClosedList();
    picker.draw();

    if (currentRoute.start !=null) {
        currentRoute.start.drawColor({
            r: 0,
            g: 200,
            b: 25
        });
    }
    if(!Timer.running) {
        Timer.running = true;
        Timer.updateTimer();
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
        console.log("alo");
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
    for (let entity of selectedItems) {
        for (let corner of entity.getCorners()) {
            if (corner.isClicked()) {
                entity.beginResize(corner);
                resizingEntity = entity;
                return;
            }
        }
    }

    Settings.timescale = 0;

    if (mouseButton === LEFT && mouseIsInsideCanvas()) {

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
        } else if (Settings.mode == "routeSelect") {
            currentRoute.start = grid.getClickedSquareObj();
        }
    }
}

function mouseDragged() {
    draggingForMovement = true;


    if (movingSelectedItems) {

        for (let item of selectedItems) {
            item._placed = false;
            // let coords = Grid.normalize(createVector());
            item.move(createVector(mouseX - lastX, mouseY - lastY));
            // console.log(coords.x, coords.y);
            item.isInvalid();
        }
        lastX = mouseX;
        lastY = mouseY;
        offsetX = 0;
        offsetY = 0;

    } else if (resizingEntity) {
        Selection.update();
        resizingEntity.resize(Selection.coords());
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

    let selectionCoords = Selection.end();

    if (resizingEntity) {
        resizingEntity = null;
    } else if (Settings.mode == "aisles") {
        let aisleCoords = selectionCoords;
        if (aisleCoords) {
            aisle = new Aisle(aisleCoords.start, aisleCoords.end);
            if (aisle.isInvalid()) {
                aisle.destroy();
            }
        }
    } else if (Settings.mode == "segments") {
        let segmentCoords = selectionCoords;

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

            if (segment.aisleId == null) {
                segment.remove();
            }
        }
    } else if (Settings.mode == "movement") {
        Controls.move(controls).mouseReleased()
    } else if (Settings.mode == "select") {
        if (mouseY > 0 && mouseButton === LEFT) {
            let collisions = getSelectedItems(selectionCoords);
            if (!collisions) {
                return;
            }
            for (let col of collisions) {
                col.select();
            }
        }
    } else if (Settings.mode == "zones") {
        let zoneCoords = selectionCoords;
        if (zoneCoords) {
            zone = new Zone(zoneCoords.start, zoneCoords.end);
            if (zone.isInvalid()) {
                zone.destroy();
            }
        }
    }
    return false;
}

function findRoute(path) {
    if (currentRoute.start != null) {
        if (!path) {
            picker = new Picker(currentRoute.start, [{
                "completed": "2019-07-09T10:31:57.186Z",
                "location": "0"
            },
            {
                "completed": "2019-07-09T10:32:57.186Z",
                "location": "5"
            },
            {
                "completed": "2019-07-09T10:33:57.186Z",
                "location": "40"
            }
        ]);
        console.log(Segment.segments)
        } else {
            picker = new Picker(currentRoute.start, path);
        }
        while (picker.findNextDestination()) {
            picker.findRoute();
        }
        // picker.route = picker.route.reverse();
        picker.animateRoute();
    } else {
        alert("Path not selected!");
    }
}

function routeImport(textObj) {
    
    let path = JSON.parse(textObj, findRoutes);
    Timer.init();
    findRoute(path);
}

function findRoutes(k, v) {
    if (k == 'completed') {
        Timer.addDate(v);
        return v;
    }
    return v
}