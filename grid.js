class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.squares = [];

        for (let x = 0; x < this.width; x++) {
            this.squares[x] = new Array();
            for (let y = 0; y < this.height; y++) {
                this.squares[x].push(new Square(x * Square.width, y * Square.width));
            }
        }
    }

    static normalize(coords) {
        return {
            x: (coords.x / controls.view.zoom) - controls.view.x - (width / 2 / controls.view.zoom),
            y: (coords.y / controls.view.zoom) - controls.view.y - (height / 2 / controls.view.zoom)
        }
    }

    draw() {
        stroke(0);
        for (let y = 0; y <= this.height * Square.width; y += Square.width) {
            line(0, y, this.width * Square.width, y);
        }
        for (let x = 0; x <= this.width * Square.width; x += Square.width) {
            line(x, 0, x, this.height * Square.width);
        }
    }

    getClickedSquare() {
        for (let squareRow of this.squares) {
            for (let square of squareRow) {
                if (square.isClicked()) {
                    return {
                        x: square.pos.x,
                        y: square.pos.y
                    };
                }
            }
        }
    }
}
