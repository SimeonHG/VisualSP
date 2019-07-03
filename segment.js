class Segment extends Entity {
    constructor(start, end) {
        super(start, end);
    }

    attach(aisle) {
        this.aisle = aisle
    }

    draw() {
        push();
        strokeWeight(3);
        fill(15, 70, 20, 160);
        rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
        this.label.draw();
        pop();
    }

    invalid() {
        console.log(this.aisle.segments);
        return super.invalid(this.aisle.segments);
    }
}