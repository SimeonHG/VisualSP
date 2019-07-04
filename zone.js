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
		fill(245, 221, 66, this._alpha);
	}





}