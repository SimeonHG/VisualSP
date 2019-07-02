class Segment extends Entity {
    constructor(start, end) {
        super(start, end);
    }

    draw() {
        push();
        strokeWeight(3);
        fill(15, 70, 20, 160);
        rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
        pop();
    }
}