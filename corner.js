class Corner {
    constructor(x, y, size = 10) {
        this.pos = {
            x: x,
            y: y
        }
        this.size = size;
    }

    draw() {
        circle(this.pos.x, this.pos.y, this.size);
    }

    isClicked() {
        let coords = {
            "x": mouseX,
            "y": mouseY
        }

        let normalizedX = Grid.normalize(coords).x;
        let normalizedY = Grid.normalize(coords).y;
        return normalizedX >= this.pos.x &&
            normalizedX <= this.pos.x + this.size &&
            normalizedY >= this.pos.y &&
            normalizedY <= this.pos.y + this.size
    }
}