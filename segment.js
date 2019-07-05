class Segment extends Entity {
    constructor(start, end) {
        if (start instanceof Segment) {
            let other = start;
            super(other);
            this._selected = other._selected;
        } else {
            super(start, end);
            this._selected = false;
        }
    }

    attach(aisle) {
        this._aisle = aisle
        aisle.segments.push(this);
    }

    remove() {
        super.remove(this._aisle.segments);
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
        return super.collisions(this._aisle.segments);
    }

    //Add constraints to moving the label
}