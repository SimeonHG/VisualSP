// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html

function BinaryHeap(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
	push: function (element) {
		// Add the new element to the end of the array.
		this.content.push(element);
		// Allow it to bubble up.
		this.bubbleUp(this.content.length - 1);
	},

	pop: function () {
		// Store the first element so we can return it later.
		var result = this.content[0];
		// Get the element at the end of the array.
		var end = this.content.pop();
		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	},

	remove: function (node) {
		var length = this.content.length;
		// To remove a value, we must search through the array to find
		// it.
		for (var i = 0; i < length; i++) {
			if (this.content[i] != node) continue;
			// When it is found, the process seen in 'pop' is repeated
			// to fill up the hole.
			var end = this.content.pop();
			// If the element we popped was the one we needed to remove,
			// we're done.
			if (i == length - 1) break;
			// Otherwise, we replace the removed element with the popped
			// one, and allow it to float up or sink down as appropriate.
			this.content[i] = end;
			this.bubbleUp(i);
			this.sinkDown(i);
			break;
		}
	},

	size: function () {
		return this.content.length;
	},

	bubbleUp: function (n) {
		// Fetch the element that has to be moved.
		var element = this.content[n], score = this.scoreFunction(element);
		// When at 0, an element can not go up any further.
		while (n > 0) {
			// Compute the parent element's index, and fetch it.
			var parentN = Math.floor((n + 1) / 2) - 1,
				parent = this.content[parentN];
			// If the parent has a lesser score, things are in order and we
			// are done.
			if (score >= this.scoreFunction(parent))
				break;

			// Otherwise, swap the parent with the current element and
			// continue.
			this.content[parentN] = element;
			this.content[n] = parent;
			n = parentN;
		}
	},

	sinkDown: function (n) {
		// Look up the target element and its score.
		var length = this.content.length,
			element = this.content[n],
			elemScore = this.scoreFunction(element);

		while (true) {
			// Compute the indices of the child elements.
			var child2N = (n + 1) * 2, child1N = child2N - 1;
			// This is used to store the new position of the element,
			// if any.
			var swap = null;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				var child1 = this.content[child1N],
					child1Score = this.scoreFunction(child1);
				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore)
					swap = child1N;
			}
			// Do the same checks for the other child.
			if (child2N < length) {
				var child2 = this.content[child2N],
					child2Score = this.scoreFunction(child2);
				if (child2Score < (swap == null ? elemScore : child1Score))
					swap = child2N;
			}

			// No need to swap further, we are done.
			if (swap == null) break;

			// Otherwise, swap and continue.
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
	},

	includesElement: function(element) {
		
		return (this.content.indexOf(element) == -1) ? false : true;
	}
};

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
		this.openHeap = new BinaryHeap(i => i);
		this.closedList = new Array();
		this.route = new Array();
	}

	findNextDestination() {
		let segment = Segment.findSegmentById(parseInt(this.pickLog[this.taskCounter].location));
		if (!segment) {
			alert("No such location");
			return;
		}
		let adjacent = segment.getAdjacentFreeSquares();
		let distancesForSquares = {}
		adjacent.forEach(square => {
			let dist = square.euclideanDistance(this.start.square);
			distancesForSquares[dist] = square;
		});

		let minDist = min(Object.keys(distancesForSquares));
		let destination = distancesForSquares[minDist];
		console.log(destination);

		this.tempSquares = [];
		this.tempSquares.push(destination);

		this.destination = new Node(destination);

		this.taskCounter++;
	}

	findRoute() {
		if (this.destination.square.hasEntity || this.start.square.hasEntity) {
			alert("Invalid destination or start!");
			return;
		}

		this.openHeap = new BinaryHeap((node) => node.f);

		this.start.setScores(0, 0);
		this.openHeap.push(this.start); 

		while (this.openHeap.size() > 0) {			
			let currentNode = this.openHeap.pop();
			
			//Rewrite this with findIndex()+
			let clIndex = this.closedList.findIndex(node => node.equals(currentNode));
			if (clIndex == -1) {
				this.closedList.push(currentNode);
			}

			// WIN CONDITION
			if (currentNode.equals(this.destination)) {
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
					if (this.closedList.findIndex(node => node.equals(currentNode)) == -1) {
						return false;
					}
					return true;
				}));

			currentNode.children.forEach((childNode) => {
				let scores = childNode.calcScores(this.start, this.destination);
				childNode.setScores(scores.g, scores.h);

				if (this.openHeap.includesElement(childNode)) {
					//THIS IS A PROBLEM
					console.log("Does include");
					return;
				}
				this.openHeap.push(childNode);
			});
		}
	 }
	 


	animateRoute() {

		setTimeout(() => {
			Node.nodes.push(this.route[Picker.animationIndex++]);
			if (Picker.animationIndex != this.route.length-1) {
				this.animateRoute();
			}	
			else{
				this.clearRoute();
			}
		}, 20000/(this.route.length*Settings.timescale));
	}

	clearRoute(){
		// Node.nodes = [];
		Picker.animationIndex = 0;
	}

	draw(){
		for (let square of this.tempSquares) {
			square.drawColor({
				r: 200,
				g: 0,
				b: 0
			});
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

Picker.animationIndex = 0;