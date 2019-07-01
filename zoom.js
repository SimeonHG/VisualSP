class Zoom{
	var zoom;
	var zMin;
	var zMax;
	var sensativity;
	 
	constructor() {
	 // createCanvas(500,500);
	 	this.zoom = 1.00;
	 	this.zMin = 0.05;
	 	this.zMax = 9.00;
	 	this.sensativity = 0.005;
	  rectMode(CENTER);
	}
	 draw() {
	 background(237, 34, 93);
	  translate(width/2,height/2);
	  fill(0);
	  scale(zoom);
	  rect(0, 0, 50, 50);
	}
	 
	function mouseWheel(event) {
	  zoom += sensativity * event.delta;
	  zoom = constrain(zoom, zMin, zMax);
	  //uncomment to block page scrolling
	  return false;
	}
}