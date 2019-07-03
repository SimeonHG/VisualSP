class Aisle extends Entity {

	constructor(start, end) {
		super(start, end);

		this._alpha = 120;
		this._selected = false;
		this._markedDestroy = false;
		this.segments = [];
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

	destroy() {
		this._markedDestroy = true;
	}

	remove() {
		super.remove(aisles);
	}

	collisions() {
		return super.collisions(aisles);
	}

	select() {
		for (let seg of this.segments) {
			seg.select();
		}
		this._selected = true;
	}

	deselect() {
		for (let seg of this.segments) {
			seg.deselect();
		}
		this._selected = false;
	}
}
