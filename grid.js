class Grid {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.squares = [];

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.squares.push(new Square(x * Square.width, y * Square.width));
            }
        }
    }

    draw() {
        stroke(0);
        for (let y = 0; y <= this.height*Square.width; y += Square.width) {
            line(0, y, this.width*Square.width, y);
        }
        for (let x = 0; x <= this.width*Square.width; x += Square.width) {
            line(x, 0, x, this.height*Square.width);
        }
    }

    getClickedSquare() {
        for (let square of this.squares) {
            if (square.isClicked()) {
                return {
                    x: square.pos.x,
                    y: square.pos.y
                };
            }
        }
    }
}
