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
		if (this.destination.square.hasEntity || this.start.square.hasEntity) {
			alert("Invalid destination or start!");
			return;
		}

		this.start.setScores(0, 0);
		this.openList.push(this.start); 

		while (this.openList.length > 0) {
			// console.log(this.closedList);
			this.openList.sort((a, b) => a.f - b.f);
			
			let currentNode = this.openList[0];
			console.log("row: " + grid.getSquareLocationInGrid(currentNode.square).row + ", col: " + grid.getSquareLocationInGrid(currentNode.square).col);
			this.openList.shift();
		
			let includes = false;
			this.closedList.forEach(node => {
				if (node.equals(currentNode)) {
					includes = true;
				}
			});
			if (!includes) {
				this.closedList.push(currentNode);
			}
			

			// WIN CONDITION
			if (currentNode.square.pos.x == this.destination.square.pos.x && currentNode.square.pos.y == this.destination.square.pos.y) {
				console.log("FOUND IT!");
				while(currentNode.parent != null) {
					// console.log(currentNode);
					this.route.push(currentNode);
					currentNode = currentNode.parent;
				}
				this.route.push(currentNode);
				return;
			}

			currentNode.setChildren(grid.getAdjacent(currentNode.square)
				.map((square) => new Node(square))
				.filter((node) => node.square.hasEntity == false)
				.filter(node => {
					this.closedList.forEach(closedListNode => {
						if (closedListNode.equals(node)) {
							return false;
						}
					});
					return true;
				}));

			currentNode.children.forEach((childNode) => {
				let scores = childNode.calcScores(this.start, this.destination);
				childNode.setScores(scores.g, scores.h);

				for (let openNode of this.openList) {
					if (openNode.equals(childNode)) {
						return;
					}
				}

				this.openList.push(childNode);
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