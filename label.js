class Label{
	constructor(x, y, factor,shouldRotate,  text) {
        this.x = x;
        this.y = y;
        this.factor = factor;
        this.shouldRotate = shouldRotate;
        this.text = text;
    }

    draw() {	
    	fill(0);
        noStroke();
        textSize(1.75 * this.factor);
        textAlign(CENTER, CENTER);
         if(this.shouldRotate){
         	push();
         	translate(this.x, this.y);
        	rotate(-PI/2);
        	text(this.text, 0, 0);
        	pop();
        } else {
        	text(this.text, this.x, this.y);
        }
    }
}
