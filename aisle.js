class Aisle extends Entity {
	constructor(start, end) {
		super(start, end);
		this.segments = [];
	}
	draw() {
		push();
		strokeWeight(3);
		fill(51, 51, 51, 160);
		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
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

		return false;
	}

	invalid() {
		for (let aisle of aisles) {
			if(this.collides(aisle))
				return true;
		}
		return false;
	}

	destroy() {

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
