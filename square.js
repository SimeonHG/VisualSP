class Square {

    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    isClicked() {
        return mouseX >= this.pos.x && mouseX <= this.pos.x + Square.width &&
               mouseY >= this.pos.y && mouseY <= this.pos.y + Square.width
    }

    draw() {
        rect(this.pos.x, this.pos.y, Square.width, Square.width);
    }
    
    json() {
        return { x: this.pos.x, y: this.pos.y };
    }
}

Square.width = 20;
