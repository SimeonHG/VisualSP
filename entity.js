class Entity {

    constructor(start, end) {
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
        } else {
            this.normalize(start, end);
        }
        this._width = abs(this.start.x - this.end.x);
        this._height = abs(this.start.y - this.end.y);
        this._selected = false;
        this.label = new Label(this, '');
    }

    centerCoords() {
        const coords = [];
        coords[0] = ((this.end.x - this.start.x) / 2) + this.start.x;
        coords[1] = ((this.end.y - this.start.y) / 2) + this.start.y;
        return coords;
    }

    snap(position) {
        let grid_size = Square.width;
        return round(position / grid_size) * grid_size;
    }

    snapAll() {
        for (const iterator of [this.start, this.end]) {
            iterator.x = this.snap(iterator.x);
            iterator.y = this.snap(iterator.y);
        }
    }

    move(direction) {
        this.start.x += direction.x;
        this.start.y += direction.y;

        this.end.x += direction.x;
        this.end.y += direction.y;
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
        return  mousepos.x >= this.start.x && mousepos.x <= this.end.x &&
                mousepos.y >= this.start.y && mousepos.y <= this.end.y
    }

    isInside(other) {
        return ((this.start.x >= other.start.x
                    && this.start.y >= other.start.y
                    && this.end.x <= other.end.x
                    && this.end.y <= other.end.y) ? true : false);
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

    collisions(others) {
        let collisions = [];

        for (let other of others) {
            if (this.collides(other) && this != other) {
                collisions.push(other);
            }
        }

        return collisions;
    }

    setLabel(text) {
        this.label = new Label(this, text);
    }

    remove(list) {
        list.splice(list.indexOf(this), 1);
    }

    select() {
        this._selected = true;
        selectedItems.push(this);
    }

	deselect() {
		this._selected = false;
	}

    json() {
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
    }
}
