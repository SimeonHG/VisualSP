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
