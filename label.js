class Label {

	constructor(entity, text) {
        this.text = text;
		this.entity = entity;
	}

	getFactor() {
		let shortestDimension = min(this.entity._width, this.entity._height);
		let longestDimension = max(this.entity._width, this.entity._height);
		return min(longestDimension / text.length, shortestDimension);
	}

	checkRotate(){
		return this.entity._height > this.entity._width;
	}

    draw() {
    	fill(0);
        noStroke();
        textSize(1.75 * this.getFactor());
        textAlign(CENTER, CENTER);
		let x = this.entity.start.x;
		let y = this.entity.start.y;
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
