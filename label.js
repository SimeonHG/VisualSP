class Label {

	constructor(entity, text) {
        this.text = text;
		this._entity = entity;
	}

	getFactor() {
		let shortestDimension = min(this._entity._width, this._entity._height);
		let longestDimension = max(this._entity._width, this._entity._height);
		//	console.log(longestDimension / text.length + " : " + shortestDimension)
		return min(longestDimension / this.text.length, shortestDimension);
	}

	checkRotate() {
		return this._entity._height > this._entity._width;
	}

    draw() {
    	fill(0);
        noStroke();
        textSize(1.5 * this.getFactor());
        textAlign(CENTER, CENTER);
		let coords = this._entity.centerCoords();
		let x = coords[0];
		let y = coords[1];
		if (this.checkRotate()) {
         	push();
         	translate(x, y);
        	rotate(-PI/2);
        	text(this.text, 0, 0);
        	pop();
        } else {
        	text(this.text, x, y);
        }
    }
}
