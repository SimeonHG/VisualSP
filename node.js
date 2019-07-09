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
        return Math.sqrt(Math.pow(this.square.pos.y - destination.square.pos.y, 2) + Math.pow(this.square.pos.x - destination.square.pos.x, 2)) / Square.width;
    }

    setScores(g, h) {
        this.g = g;
        this.h = h;
        this.f = this.g + this.h;
        // console.log("g: " + this.g.toFixed(2));
    }

    draw() {
        fill(150, 0, 0);
        this.square.draw();
    }

    drawColor(color) {
        fill(color.r, color.g, color.b);
        this.square.draw();
    }

    drawWithScores(color) {
        if (color) {

            this.drawColor(color);
        } else {
            this.draw();
        }
        textSize(8);
        text(`${this.g.toFixed(1)}`, this.square.pos.x, this.square.pos.y + Square.width / 3);
        text(`${this.h.toFixed(1)}` , this.square.pos.x, this.square.pos.y + Square.width/2 + 4);
        text(`${this.f.toFixed(1)}`, this.square.pos.x, this.square.pos.y + Square.width);
    }

    equals(other) {
        return this.square == other.square;
    }
}