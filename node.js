class Node {
    constructor(square) {
        this.square = square;
        this.g = -1;
        this.h = -1;
        this.f = this.g + this.h;
        this.children = new Array();
        this.parent = null;
        this.visited = false;
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
        return this.square.manhattanDistance(destination.square);
    }

    setScores(g, h) {
        this.g = g;
        this.h = h;
        this.f = this.g + this.h;
    }

    draw(color) {
        fill(color.r, color.g, color.b, 15);
        this.square.draw();
    }

    drawColor(color) {
        fill(color.r, color.g, color.b, 15);
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

Node.nodes = [];
