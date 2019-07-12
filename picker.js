class Picker {
	constructor(startSqr, pickLog) {
		this.start = new Node(startSqr);
		this.destination = null;
		this.pickLog = pickLog;
		this.taskCounter = 0;
		this.tempSquares = [];

		this.r = random(255);
		this.g = random(255);
		this.b = random(255);
		this.openList = new Array();
		this.closedList = new Array();
		this.route = new Array();
		this.moving = false;
	}

	findNextDestination() {
		if (this.pickLog.length <= this.taskCounter)
			return false;

		let segment = Segment.findSegmentById(parseInt(this.pickLog[this.taskCounter].location));
		if (!segment) {
			// alert("No such location");
			return false;
		}

		// if (this.destination != null) {
		// 	this.start = this.destination;
		// }

		let adjacent = segment.getAdjacentFreeSquares();
		let distancesForSquares = {}
		adjacent.forEach(square => {
			let dist = square.euclideanDistance(this.start.square);
			distancesForSquares[dist] = square;
		});

		let minDist = min(Object.keys(distancesForSquares));
		let destination = distancesForSquares[minDist];

		this.tempSquares.push(destination);

		this.destination = new Node(destination);

		this.taskCounter++;
		return true;
	}

	findRoute(index) {
		if (this.destination.square.hasEntity || this.start.square.hasEntity) {
			alert("Invalid destination or start!");
			return;
		}

		this.start.setScores(0, 0);
		this.openList.push(this.start);

		this.route.push([]);
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
				while (currentNode.parent != null) {
					this.route[index].push(currentNode);
					currentNode = currentNode.parent;
				}
				this.route[index].push(currentNode);
				this.animateRoutes();
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
						//DO SMTH HERE!!!
					}
				}

				this.openList.push(childNode);
			});
		}

	 }

	animateRoutes(nodeIndex, routeIndex) {
		if (nodeIndex == null) {
			routeIndex = 0;
			nodeIndex = this.route[0].length-1;
			Node.nodes.push([]);
		}
		setTimeout(() => {
			Node.nodes[routeIndex].push(this.route[routeIndex][nodeIndex]);
			if (nodeIndex > 0) {
				this.animateRoutes(--nodeIndex, routeIndex);
			} else {
				this.animateRoutes(this.route[++routeIndex].length-1, routeIndex);
				Node.nodes.push([]);
				console.log("zdrasty")
			}
		}, Timer.deltas[routeIndex] / (this.route[routeIndex].length * Settings.timescale));
	}

	draw(){
		for (let square of this.tempSquares) {
			square.drawColor({
				r: 200,
				g: 0,
				b: 0
			});
		}

		for (let nodeList of Node.nodes) {
			for(let node of nodeList){
				node.draw({
					r: this.r,
					g: this.g,
					b: this.b
				});
			}
		}
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
Picker.deltaIndex = 0;
