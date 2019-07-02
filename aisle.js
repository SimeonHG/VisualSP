class Aisle {
	constructor(start, end) { 
		this.start = start;
		this.end = end;
	}

	draw() {
		push();
		strokeWeight(3);
		fill(51, 51, 51, 160);
		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
		pop();
	}

	delete() {
		//to be done
	}
}