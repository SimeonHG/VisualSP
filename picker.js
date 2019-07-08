class Picker {

	constructor(square, destSegment){
		this.square
		this.destSegment = destSegment;
		this.r = random(255);
		this.g = random(255);
		this.b = random(255);
	}

	findRoute() {

	}

	draw(){
		
		fill(this.r, this.g, this.b, 100);
		ellipse(this.x, this.y, 20, 20);
		//
		// this.x += random(-20, 20);
  		// this.y += random(-20, 20);

	}

}