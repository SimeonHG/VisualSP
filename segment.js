class Segment extends Entity {

    constructor(start, end, aisleId) {
        if (start instanceof Segment) {
            let other = start;
            super(other);
            this._selected = other._selected;
        } else {
            super(start, end);
            this._selected = false;
        }

        Segment.segments.push(this);
        this.id = Segment.segments.indexOf(this);
        if (aisleId !== undefined) {
            this.aisleId = aisleId;
        }
    }

    attach(aisle) {
        this.aisleId = aisle.id;
        aisle.segments.push(this);
    }

    move(dir) {
        let aisle = Aisle.aisles[this.aisleId];

        let mousePos = {
            x: mouseX,
            y: mouseY
        };

        mousePos = Grid.normalize(mousePos);

        let invalidPos = dimension => (this.start[dimension] + dir[dimension] + this._dimensions[dimension] >= aisle.end[dimension]) ||
            (this.start[dimension] + dir[dimension] <= aisle.start[dimension]);

        let invalidMouse = dimension => {
            if (mousePos[dimension] >= aisle.end[dimension] - this._dimensions[dimension] / 2) {
                return 1;
            }
            if (mousePos[dimension] <= aisle.start[dimension] + this._dimensions[dimension] / 2) {
                return -1;
            }
            return 0;
        };

        let res;
        if ((res = invalidMouse('x')) || invalidPos('x')) {
            dir.x = 0;

            switch (res) {
                case 1:
                    this.setpos(createVector(aisle.end.x - this._width, this.start.y));
                    break;
                case -1:
                    this.setpos(createVector(aisle.start.x, this.start.y));
                    break;
            }
        }

        if ((res = invalidMouse('y')) || invalidPos('y')) {
            dir.y = 0;
            switch (res) {
                case 1:
                    this.setpos(createVector(this.start.x, aisle.end.y - this._height));
                    break;
                case -1:
                    this.setpos(createVector(this.start.x, aisle.start.y));
                    break;
            }
        }

        super.move(dir);
    }

    remove() {
        let aisle = Aisle.aisles[this.aisleId];
        super.remove(aisle.segments);
    }

    draw() {
        super.draw();
        push();
        strokeWeight(2);
        fill(65, 120, 70, 200);
        if (this._selected) {
            fill(50, 80, 200, 100);
            stroke(0, 0, 200);
        }

        if (this.isInvalid() && this._selected) {
            fill(120, 120, 120, this._alpha);
        }

        rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
        this.label.draw();
        pop();
    }

    collisions() {
        let aisle = Aisle.aisles[this.aisleId];
        return super.collisions(aisle.segments);
    }

    //Add constraints to moving the label
}

Segment.segments = [];