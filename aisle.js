class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);
		this.segments = [];

		this.width = {
			x: this.end.x - this.start.x,
			y: this.end.y - this.start.y
		};
		this.corners = [
			createVector(this.start.x               ,   this.start.y),
			createVector(this.start.x + this.width.x,   this.start.y),
			createVector(this.start.x + this.width.x,   this.start.y + this.width.y),
			createVector(this.start.x               ,   this.start.y + this.width.y)
		];
		this.toDestroy = false;
		this.color = {r: 51, g: 51, b: 51, a:160};

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
		for (let corner of this.corners) {
			circle(corner.x, corner.y, 5);
		}
		pop();
	}

	collides(other) {
		let w = 0.5 * (this.width.x + other.width.x);
		let h = 0.5 * (this.width.y + other.width.y);
		let dx = (this.x + this.width.x) / 2 - (other.x + other.width.x) / 2;
		let dy = (this.y + this.width.y) / 2 - (other.y + other.width.y) / 2;

		if (abs(dx) <= w && abs(dy) <= h) {
			return true;
		}
		return true;
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
