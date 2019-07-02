class Aisle extends Entity {
	constructor(start, end) {
		super(start, end);
	}

	draw() {
		push();
		strokeWeight(3);
		fill(51, 51, 51, 160);
		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
		pop();
	}

	invalid() {
		for (let aisle of aisles) {

		}
	}

	destroy() {

	}
}
