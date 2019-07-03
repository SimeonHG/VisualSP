class Segment extends Entity {
    constructor(start, end) {
        super(start, end);
        this._selected = false;
    }

    attach(aisle) {
        this.aisle = aisle
        aisle.segments.push(this);
    }

    remove() {
        super.remove(this.aisle.segments);
    }

    draw() {
        push();
        strokeWeight(2);
        fill(65, 120, 70, 200);
        if (this._selected) {
            fill(50, 80, 200, 100);
            stroke(0, 0, 200);
        }
        rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
        pop();
    }

    select() {
        this._selected = true;
    }

    deselect() {
        this._selected = false;
    }

    collisions() {
        return super.collisions(this.aisle.segments);
    }
}
