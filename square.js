class Square {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hasEntity = false;
        this.color = {
            r: 0,
            g: 0,
            b: 0
        }
        //This is for A* pathfinding
        // this.visited = false;
    }

    isClicked() {
        let coords = {
            "x": mouseX,
            "y": mouseY
        }
        let normalizedX = Grid.normalize(coords).x;
        let normalizedY = Grid.normalize(coords).y;
        return normalizedX >= this.pos.x &&
                normalizedX <= this.pos.x + Square.width &&
                normalizedY >= this.pos.y &&
                normalizedY <= this.pos.y + Square.width
    }

    draw() {
        rect(this.pos.x, this.pos.y, Square.width, Square.width);
    }

    drawColor(color) {
        push();
        fill(color.r, color.g, color.b);
        rect(this.pos.x, this.pos.y, Square.width, Square.width);
        pop();
    }

    json() {
        return { x: this.pos.x, y: this.pos.y };
    }

    euclideanDistance(otherSqr) {
        return Math.sqrt(Math.pow(this.pos.y - otherSqr.pos.y, 2) + Math.pow(this.pos.x - otherSqr.pos.x, 2)) / Square.width;
    }

    manhattanDistance(otherSqr) {
        return (Math.abs(this.pos.x - otherSqr.pos.x) + Math.abs(this.pos.y - otherSqr.pos.y)) / Square.width;
    }
}

Square.width = 20;
