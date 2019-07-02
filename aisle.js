class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);
		this.start = start;
		this.end = end;

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
		rect(this.start.x, this.start.y, this.width.x, this.width.y);
		for (let corner of this.corners) {
			circle(corner.x, corner.y, 5);
		}
		pop();
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
