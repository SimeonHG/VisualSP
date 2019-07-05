class Picker {

	constructor(square, destinationSqr){
		this.square= square;
		this.destinationSqr = destinationSqr;
		this.r = random(255);
		this.g = random(255);
		this.b = random(255);
	}

	findRoute() {
		// console.log(this.square);
		let sqrLocation = grid.getSquareLocationInGrid(this.square);
		console.log(sqrLocation)
		// if (grid.squares[squarePosInGrid.x][squarePosInGrid.y+1]) {

		// }
 	}

	draw(){
		
		fill(this.r, this.g, this.b, 100);
		ellipse(this.x, this.y, 20, 20);
		//
		// this.x += random(-20, 20);
  		// this.y += random(-20, 20);

	}

}