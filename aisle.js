class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);

		this.normalize();

		this.width = abs(this.start.x - this.end.x);
		this.height = abs(this.start.y - this.end.y);

		this.color = {r: 51, g: 51, b: 51, a: 120};

		this.segments = [];
	}

	normalize() {
		let o1 = this.end;
		let o2 = this.start;

		let new_start = { x: min(o1.x, o2.x), y: min(o1.y, o2.y)};
		let new_end = { x: max(o1.x, o2.x), y: max(o1.y, o2.y)};

		this.start = new_start;
		this.end = new_end;
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

	collides(other) {
		if (this.start.x < other.start.x + other.width &&
			this.start.x + this.width > other.start.x &&
			this.start.y < other.start.y + other.height &&
			this.start.y + this.height > other.start.y) {
			return true;
		 }

		return false;
	}

	invalid() {
		for (let aisle of aisles) {
			if (this.collides(aisle)) {
				return true;
			}
		}
		return false;
	}

	destroy() {
		this.toDestroy = true;
		this.alpha = 180;
		this.color = {r: 255, g: 0, b: 0};
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
