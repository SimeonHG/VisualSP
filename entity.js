class Entity extends Object {

    constructor(start, end, label) {
        super();
        if (start instanceof Entity) {
            let other = start;
            this.start = {
                x: other.start.x,
                y: other.start.y
            };
            this.end = {
                x: other.end.x,
                y: other.end.y
            };
            this._selected = other._selected;

        } else {
            this.normalize(start, end);
        }
        this._placed = false;
        this._width = abs(this.start.x - this.end.x);
        this._height = abs(this.start.y - this.end.y);
        this._dimensions = {
            x: this._width,
            y: this._height
        }
        this._selected = false;
        this._invalid = false;
        if (label == undefined) {
            this.label = new Label(this, '');
        } else {
            this.label = label;
        }
        Entity.entities.push(this);
        this.setCorners();
    }

    draw() {
        for (let corner of this._corners) {
            corner.draw();
        }
    }

    setCorners() {
        if (!this._corners) {
            this._corners = [];
            this._corners.push(new Corner(this.start.x, this.start.y));
            this._corners.push(new Corner(this.end.x  , this.start.y));
            this._corners.push(new Corner(this.end.x  , this.end.y));
            this._corners.push(new Corner(this.start.x, this.end.y));
            return;
        }
        this._corners[0].setpos(createVector(this.start.x, this.start.y));
        this._corners[1].setpos(createVector(this.end.x  , this.start.y));
        this._corners[2].setpos(createVector(this.end.x  , this.end.y));
        this._corners[3].setpos(createVector(this.start.x, this.end.y));        
    }

    centerCoords() {
        const coords = [];
        coords[0] = ((this.end.x - this.start.x) / 2) + this.start.x;
        coords[1] = ((this.end.y - this.start.y) / 2) + this.start.y;
        return coords;
    }

    getCorners() {
        return this._corners;
    }

    snap(position) {
        let grid_size = Square.width;
        return round(position / grid_size) * grid_size;
    }

    snapAll() {
        for (const iterator of[this.start, this.end]) {
            iterator.x = this.snap(iterator.x);
            iterator.y = this.snap(iterator.y);
        }
        this.setCorners();
    }

    move(direction) {
        this.start.x += direction.x / controls.view.zoom;
        this.start.y += direction.y / controls.view.zoom;

        this.end.x += direction.x / controls.view.zoom;
        this.end.y += direction.y / controls.view.zoom;
        this.setCorners();
    }

    normalize(o1, o2) {
        let new_start = {
            x: min(o1.x, o2.x),
            y: min(o1.y, o2.y)
        };
        let new_end = {
            x: max(o1.x, o2.x),
            y: max(o1.y, o2.y)
        };

        this.start = new_start;
        this.end = new_end;
    }

    isClicked() {
        let mousepos = Grid.normalize(createVector(mouseX, mouseY));
        return mousepos.x >= this.start.x && mousepos.x <= this.end.x &&
            mousepos.y >= this.start.y && mousepos.y <= this.end.y
    }

    isInside(other) {
        return ((this.start.x >= other.start.x &&
            this.start.y >= other.start.y &&
            this.end.x <= other.end.x &&
            this.end.y <= other.end.y) ? true : false);
    }

    collides(other) {
        if (this.start.x < other.start.x + other._width &&
            this.start.x + this._width > other.start.x &&
            this.start.y < other.start.y + other._height &&
            this.start.y + this._height > other.start.y) {
            return true;
        }

        return false;
    }

    setpos(pos) {
        this.start = {
            x: pos.x,
            y: pos.y
        }

        this.end = {
            x: this.start.x + this._width,
            y: this.start.y + this._height
        }
    }

    collisions(others) {
        let collisions = [];

        for (let other of others) {
            if (this.collides(other) && this != other) {
                collisions.push(other);
            }
        }

        return collisions;
    }

    isInvalid() {
        if (this.collisions().length > 0 && !this._placed) {
            this._invalid = true;
        } else {
            if (this._invalid) {
                this.snapAll();
            }

            this._invalid = false;
        }

        return this._invalid;
    }

    place() {
        this._placed = true;         
        this.snapAll();
    }

    pick() {
        this._placed = false;
    }

    setLabel(text) {
        this.label = new Label(this, text);
    }

    remove(list) {
        list.splice(list.indexOf(this), 1);
    }

    select() {
        this._selected = true;
        this.setCorners();
        for (let corner of this._corners) {
            corner.activate();
        }
        selectedItems.push(this);
    }

    deselect() {
        this._selected = false;
        for (let corner of this._corners) {
            corner.deactivate();
        }
    }

    beginResize(corner) {
        let index = this._corners.indexOf(corner);
        index = (index + 2) % 4;
        Selection.begin(this._corners[index].pos);
    }

    resize(coords) {
        this.start = coords.start;
        this.end = coords.end;
        this._width = Math.abs(coords.start.x - coords.end.x);
        this._height = Math.abs(coords.start.y - coords.end.y);
        this.normalize(this.start, this.end);       
        this._dimensions = {
            x: this._width,
            y: this._height
        };
        this.setCorners();
        this.isInvalid();
    }
}

Entity.entities = [];

Object.json = (function() {
    let obj = new Object();
    let props = Reflect.ownKeys(this);

    for (const prop of props) {
        if (prop.charAt(0) == '_')
            continue;

        let value = Reflect.get(this, prop);

        if (value instanceof Array) {
            value = value.map((e) => e instanceof Object ? e.json() : e);
        }

        if (value instanceof Object && Reflect.has(value, 'json')) {
            obj[prop] = value.json();
        } else {
            obj[prop] = value;
        }
    }

    return obj;
});