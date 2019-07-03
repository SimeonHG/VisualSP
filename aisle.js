class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);

		

		this._color = {r: 51, g: 51, b: 51, a: 120};

		this.segments = [];
	}

	

	draw() {
		push();
		strokeWeight(3);
		let {r, g, b, a} = this._color;
		fill(r, g, b, a);
		if (this.toDestroy) {
			noStroke();
			this._color.a -= 10;
			if (this._color.a <= 0) {
				this.remove()
			}
		}
		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);

		pop();
	}

	destroy() {
		this.toDestroy = true;
		this._color = {r: 255, g: 0, b: 0, a: 180};
	}

	remove() {
		aisles.splice(aisles.indexOf(this), 1);
	}

	invalid() {
		return super.invalid(aisles);
	}

}
