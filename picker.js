class Picker {
	constructor(startSqr, pickLog) {
		this.start = new Node(startSqr);
		// this.pickLog =

		this.r = random(255);
		this.g = random(255);
		this.b = random(255);
		this.openList = new Array();
		this.closedList = new Array();
		this.route = new Array();
	}

	findRoute() {
		if (this.destination.square.hasEntity || this.start.square.hasEntity) {
			alert("Invalid destination or start!");
			return;
		}

		this.start.setScores(0, 0);
		this.openList.push(this.start); 

		while (this.openList.length > 0) {
			this.openList.sort((a, b) => a.f - b.f);
			
			let currentNode = this.openList[0];
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
				while(currentNode.parent != null) {
					this.route.push(currentNode);
					currentNode = currentNode.parent;
				}
				this.route.push(currentNode);
				this.animateRoute();
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
	 


	animateRoute() {
		if (this.route.length > 0) {
			//this.clearRoute();	
			let i = 0;
			let id = setInterval(() => { 
				
				Node.nodes.push(this.route[i++]);
				if (i == this.route.length) {
					clearInterval(id);
					// this.clearRoute();
				}
			}, 100); /// change to time/picker.route.length
		}
	}

	clearRoute(){
		Node.nodes = [];
	}

	draw(){
		fill(this.r, this.g, this.b, 100);
		ellipse(this.x, this.y, 20, 20);
	}

	drawClosedList() {
		this.closedList.forEach(node => node.drawWithScores({
			r: 100,
			g: 100,
			b: 100
		}));
	}

	drawOpenList() {
		this.openList.forEach(node => node.drawWithScores({
			r: 0,
			g: 100,
			b: 100
		}));
	}

}
