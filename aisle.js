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

	delete() {
		//to be done
    }
    
    json() {
		let obj = new Object();
		let props = Reflect.ownKeys(this);
		
		for (const prop of props) {
			let value = Reflect.get(this, prop);
			
			if (Reflect.has(value, 'json')) {
				obj[e] = value.json();
			} else {
				obj[e] = value;
			}
		}

		return obj;
    }
}