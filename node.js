class Node {
    constructor(square) {
        this.square = square;
        this.g = -1;
        this.h = -1;
        this.f = this.g + this.h;
        this.children = new Array();
        this.parent = null;
    }

    setChildren(children) {
        this.children = children;
        this.children.forEach((child) => child.parent = this);
    }

    calcScores(start, destination) {
        return {
            g: this.parent.g + 1,
            h: this.distanceToDestination(destination),
            get f() { return this.g + this.h; }
        }
    }

    distanceToDestination(destination) {
        return Math.sqrt(Math.pow(this.square.pos.y - destination.square.pos.y, 2) + Math.pow(this.square.pos.x - destination.square.pos.x, 2));
    }

    setScores(g, h) {
        this.g = g;
        this.h = h;
        this.f = this.g + this.h;
    }

    draw() {
        fill(150, 0, 0);
        this.square.draw();
    }

    drawColor(color) {
        fill(color.r, color.g, color.b);
        this.square.draw();
    }

    equals(other) {
        return this.square == other.square;
    }
}