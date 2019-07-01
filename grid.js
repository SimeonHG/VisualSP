class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw() {
        stroke(0);
        for (let y = 0; y < this.height; y += 20) {
            line(0, y, this.width, y);
        }
        for (let x = 0; x < this.width; x += 20) {
            line(x, 0, x, this.height);
        }
    }
}
