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

        Aisle.aisles.push(this);
        this.id = Aisle.aisles.indexOf(this);
    }

    draw() {
        super.draw();
        push();
        strokeWeight(3);

        fill(51, 51, 51, 180);
        
        if (this._selected) {
            fill(0, 0, 180, 120);
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

        if (this._invalid) {
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

    snapAll() {
        super.snapAll();
        for (const iterator of this.segments) {
            iterator.snapAll();
        }
    }

    destroy() {
        this._markedDestroy = true;
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
        super.remove(Aisle.aisles);
    }

    collisions() {
        return super.collisions(Aisle.aisles);
    }

    deselect() {
        super.deselect();
        for (let segment of this.segments) {
            segment.deselect();
        }
    }
}

Aisle.aisles = [];