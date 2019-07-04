class Aisle extends Entity {

	constructor(start, end) {

		if(start instanceof Aisle) {
			let other = start;
			super(other);
			this.segments = other.segments.map((e) => new Segment(e));
			this._selected = other._selected;
		} else {
			super(start, end);
			this._selected = false;
			this.segments = [];
		}

		this._alpha = 120;
		this._markedDestroy = false;
	}

	draw() {
		push();
		strokeWeight(3);

		fill(51, 51, 51, 180);

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

		if (Settings.viewModes().includes("show-segments")) {
			for (let segment of this.segments) {
				segment.draw();
			}
		}
	}

	setpos(pos) {
		let dir = {
			x: pos.x - this.start.x,
			y: pos.y - this.start.y
		}
	
		this.move(dir);
	}

	move(direction) {
		super.move(direction);
		for (let segment of this.segments) {
			segment.move(direction);
		}
	}

	destroy() {
		this._markedDestroy = true;
	}

	remove() {
		super.remove(aisles);
	}

	collisions() {
		return super.collisions(aisles);
	}

	deselect() {
		super.deselect();
		for (let segment of this.segments) {
			segment.deselect();
		}
	}
}
