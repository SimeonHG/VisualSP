class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);

		

		this.color = {r: 51, g: 51, b: 51, a: 120};

		this.segments = [];
	}

	

	draw() {
		push();
		strokeWeight(3);
		fill(51, 51, 51, 160);
		let {r, g, b, a} = this.color;
		this.alpha -= 10;
		fill(r, g, b, this.alpha);
		if (this.toDestroy) {
			noStroke();
			if (this.alpha <= 0) {
				console.log(aisles.indexOf(this));
				aisles.splice(aisles.indexOf(this), 1);
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
		this.alpha = 180;
		this.color = {r: 255, g: 0, b: 0};
	}

	invalid() {
		return super.invalid(aisles);
	}

    json() {
		let obj = new Object();
		let props = Reflect.ownKeys(this);

		for (const prop of props) {
			let value = Reflect.get(this, prop);

			if (value instanceof Object && Reflect.has(value, 'json')) {
				obj[prop] = value.json();
			} else {
				obj[prop] = value;
			}
		}

		return obj;
    }
}
