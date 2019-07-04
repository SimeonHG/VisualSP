class Zone extends Entity {
	constructor(start, end) {
		super(start, end);

		this._alpha = 60;
		this._selected = false;
		this._markedDestroy = false;

	}
	draw() {
		push();
		strokeWeight(2);
		//console.log(hello);
		fill(245, 221, 66, this._alpha);

		if (this._selected) {
			fill(100, 149, 237, 160);
			stroke(0, 0, 255);
		}
		if (this._markedDestroy) {
			fill(255, 0, 0, this._alpha);
			noStroke();
			this._alpha -= 10;
			if (this._alpha <= 0) {
				this.remove()
			}
		}

		rect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
		pop();
	}

	move(direction) {
		super.move(direction);
	}
	destroy() {
		this._markedDestroy = true;
	}
	remove() {
		super.remove(zones);
	}

	collisions() {
		return super.collisions(zones);
	}
	deselect() {
		super.deselect();
		
	}








}