class Aisle extends Entity {

    constructor(start, end, segments) {

        if (start instanceof Aisle) {
            let other = start;
            super(other);
            this.segments = other.segments.map((e) => new Segment(e));
            this._selected = other._selected;
        } else {
            super(start, end);
            this._selected = false;
            this.segments = segments == undefined ? [] : segments;
        }

        this._alpha = 120;
        this._markedDestroy = false;
    }

    draw() {
        push();
        strokeWeight(3);

        fill(51, 51, 51, 180);

        if (this._selected) {
            fill(100, 149, 237, 160);
            stroke(0, 0, 255);
        }

        if (this._markedDestroy) {
            fill(255, 0, 0, this._alpha);
            noStroke();
            this._alpha -= 10;
            if (this._alpha <= 0) {
                this.remove()
            }
        }

        if (this.isInvalid() && this._selected) {
            fill(120, 120, 120, this._alpha);
        }

        rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
        pop();

        if (Settings.viewModes().includes("show-segments")) {
            for (let segment of this.segments) {
                segment.draw();
            }
        }
    }

    move(direction) {
        super.move(direction);
        for (let segment of this.segments) {
            segment.move(direction);
        }
    }

    destroy() {
        this._markedDestroy = true;
    }

    remove() {
        super.remove(aisles);
    }

    collisions() {
        return super.collisions(aisles);
    }

    deselect() {
        super.deselect();
        for (let segment of this.segments) {
            segment.deselect();
        }
    }
}