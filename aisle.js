class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);

		

		this.color = {r: 51, g: 51, b: 51, a: 120};

		this.segments = [];
	}

	

	draw() {
		push();
		strokeWeight(3);
		let {r, g, b, a} = this.color;
		fill(r, g, b, a);
		if (this.toDestroy) {
			noStroke();
			this.color.a -= 10;
			if (this.color.a <= 0) {
				this.remove()
			}
		}
		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
		// for (let corner of this.corners) {
		// 	circle(corner.x, corner.y, 5);
		// }
		pop();
	}

	destroy() {
		this.toDestroy = true;
		this.color = {r: 255, g: 0, b: 0, a: 180};
	}

	remove() {
		aisles.splice(aisles.indexOf(this), 1);
	}

	invalid() {
		return super.invalid(aisles);
	}

	selected() {
		this.color = {r: 0, g: 255, b: 0, a: 180};
	}

	deselect() {
		this.color = {r: 51, g: 51, b: 51, a: 120};
	}

    json() {
		let obj = new Object();
		let props = Reflect.ownKeys(this);

		for (const prop of props) {
			let value = Reflect.get(this, prop);

			if (Reflect.has(value, 'json')) {
				obj[prop] = value.json();
			} else {
				obj[prop] = value;
			}
		}

		return obj;
    }
}
