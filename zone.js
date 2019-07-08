class Zone extends Entity {

	constructor(start, end) {
		if (start instanceof Zone) {
			super(start);
		} else {
			super(start, end);
		}

		this._alpha = 60;
		this._markedDestroy = false;

		Zone.zones.push(this);
		this.id = Zone.zones.indexOf(this);
	}
	draw() {
		push();
		strokeWeight(2);

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

	destroy() {
		this._markedDestroy = true;
	}

	remove() {
		super.remove(Zone.zones);
	}

	collisions() {
		return super.collisions(Zone.zones);
	}
}

Zone.zones = [];
