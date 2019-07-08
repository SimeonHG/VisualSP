class Square {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.hasEntity = false;
        this.color = {
            r: 0,
            g: 0,
            b: 0
        }
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
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.pos.x, this.pos.y, Square.width, Square.width);
    }

    json() {
        return { x: this.pos.x, y: this.pos.y };
    }
}

Square.width = 20;
