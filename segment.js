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

    remove() {
        let aisle = Aisle.aisles[this.aisleId];
        super.remove(aisle.segments);
    }

    draw() {
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
