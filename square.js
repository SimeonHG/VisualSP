class Square {

    constructor(x, y) {
        this.pos = createVector(x, y);
    }

    isClicked() {
        return mouseX / controls.view.zoom >= this.pos.x && mouseX / controls.view.zoom <= this.pos.x + Square.width &&
               mouseY / controls.view.zoom >= this.pos.y && mouseY / controls.view.zoom <= this.pos.y + Square.width
    }

    draw() {
        rect(this.pos.x, this.pos.y, Square.width, Square.width);
    }
    
    json() {
        return { 'x': this.pos.x, 'y': this.pos.y };
    }
}

Square.width = 20;
