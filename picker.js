class Picker {
	constructor(startSqr, destinationSqr) {
		// console.log("destinationSqr: " + destinationSqr.pos.x);
		this.start = new Node(startSqr);
		this.destination = new Node(destinationSqr);

		this.r = random(255);
		this.g = random(255);
		this.b = random(255);
		this.openList = new Array();
		this.closedList = new Array();
		this.route = new Array();
	}

	findRoute() {
		// console.log("start " + this.start.square);

		this.start.setScores(0, 0);
		this.openList.push(this.start); 

		while (this.openList.length > 0) {
			this.openList.sort((a, b) => a.f - b.f);
			console.log(this.openList);
			// console.log("In loop");
			
			let currentNode = this.openList[0];
			this.openList.shift();
			this.closedList.push(currentNode);

			if (currentNode.square.pos.x == this.destination.square.pos.x && currentNode.square.pos.y == this.destination.square.pos.y) {
				// this is the end node!
				console.log("FOUND IT!");
				while(currentNode.parent != null) {
					// console.log(currentNode);
					this.route.push(currentNode);
					currentNode = currentNode.parent;
				}
				this.route.push(currentNode);
				// console.log(currentNode);
				return;
			}

			currentNode.setChildren(grid.getAdjacent(currentNode.square).map((square) => new Node(square)));
			currentNode.children.forEach((childNode) => {
				if (this.closedList.includes(childNode)) {
					//already processed this node
					return;
				}

				let scores = childNode.calcScores(this.start, this.destination);
				childNode.setScores(scores.g, scores.h);

				for (let openNode of this.openList) {
					if (openNode.square == childNode.square && childNode.g > openNode.g) {
						return;
					}
				}

				this.openList.push(childNode);
				this.openList.sort((a, b) => a.f - b.f);
			});
		}
 	}

	drawRoute() {
		if (this.route.length > 0) {
			this.route.forEach((node) => {
				node.draw();
			})
		}
	}

	draw(){
		
		fill(this.r, this.g, this.b, 100);
		ellipse(this.x, this.y, 20, 20);
		//
		// this.x += random(-20, 20);
  		// this.y += random(-20, 20);

	}

}