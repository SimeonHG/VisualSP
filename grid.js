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

    getSquare(x, y) {
        return this.squares[x / Square.width][y / Square.width];
    }

    getAdjacent(square) {
        let sqrLocation = this.getSquareLocationInGrid(square);
        let adjacent = new Array();
        //Need 2 refactor this at some point
        if (sqrLocation.row + 1 <= this.width) {
            adjacent.push(this.squares[sqrLocation.col][sqrLocation.row + 1]);
        }
        if (sqrLocation.col + 1 <= this.height) {
            adjacent.push(this.squares[sqrLocation.col + 1][sqrLocation.row]);
        }
        if (sqrLocation.col - 1 >= 0) {
            adjacent.push(this.squares[sqrLocation.col - 1][sqrLocation.row]);
        }
        if (sqrLocation.row - 1 >= 0) {
            adjacent.push(this.squares[sqrLocation.col][sqrLocation.row - 1]);
        }

        return adjacent;
    }

    getSquareLocationInGrid(square) {
        // console.log(square);
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].indexOf(square) != -1) {
                return {
                    row: this.squares[i].indexOf(square),
                    col: i
                }
            }
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
    

    getClickedSquareObj() {
        for (let squareRow of this.squares) {
            for (let square of squareRow) {
                if (square.isClicked()) {
                    return square;
                }
            }
        }
    }
}
