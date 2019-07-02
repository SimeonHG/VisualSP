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

	collides(other) {
		let wX = this.end.x - this.start.x;
		let wY = this.end.y - this.start.y;

		let owX = other.end.x - other.start.x;
		let owY = other.end.y - other.start.y;

		return (this.start.x + wX < other.start.x);
	}

	invalid() {
		for (let aisle of aisles) {

		}
	}

	destroy() {

	}
    
    json() {
		let obj = new Object();
		let props = Reflect.ownKeys(this);
		
		for (const prop of props) {
			let value = Reflect.get(this, prop);
			
			if (Reflect.has(value, 'json')) {
				obj.e = value.json();
			} else {
				obj.e = value;
			}
		}

		return obj;
    }
}
