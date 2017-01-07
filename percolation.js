// Programming Assignment 1: Percolation
// http://coursera.cs.princeton.edu/algs4/assignments/percolation.html
const Percolation = function (n) {

	/*==== Initialisation ====*/
	this.id = [];
	for (var i = 0; i < n*n; i++) {
		this.id[i] = i;
	}

	this.size = new Array(n*n).fill(1);
	this.sites = {
		board: [],
		open: 0,
		total: n*n
	}
	this.sites.board = new Array(n*n).fill(0); //Keep track of open points
	
	//Create (and link) a top and bottom node 
	//that will be connected to the top and bottom row to check Percolation
	let topIndex = this.id.length
	this.id.push(topIndex)
	let bottomIndex = this.id.length
	this.id.push(bottomIndex)

	for (var i = 0; i < n; i++) {
		this.id[i] = topIndex;
	}

	for (var i = n*n - 1; i > n*n - n -1; i--) {
		this.id[i] = bottomIndex;
	}


	/*==== Functionality ====*/
	this.openRandom = function() {
		if (this.sites.open === this.sites.total) {
			throw new Error('All sites already open')
		}

		//Find a random (but closed) site
		let randomIndex = Math.floor(Math.random() * this.sites.total);
		while (this.sites.board[randomIndex] != 0) {
			randomIndex = Math.floor(Math.random() * this.sites.total);
		}

		this.sites.board[randomIndex] = 1;
		this.sites.open += 1;

		const inboundsOptions = this.getInboundsOptions(randomIndex);

		for (var i = 0; i < inboundsOptions.length; i++) {
			this.addUnion(randomIndex, inboundsOptions[i])
		}
	}

	this.findRoot = function(index) {
		while (index != this.id[index]) {
			index = this.id[index]
		}
		return index;
	}

	this.getInboundsOptions = function (start) {
		//Find the locations of the points that are 
			//in bounds
			//are not already joined to the starting point
			//are opened (water can flow through)
		if (start < 0 || start >= n*n) {throw new Error('Input provided is out of bounds')}
		let openings = [];

		//Convert array index into a row / column format
		const row = Math.floor(start / n);
		const col = start % n;

		//Find the array index version of all the directions
		const up = (row - 1) * n + col
		const down = (row + 1) * n + col
		const left = start - 1;
		const right = start + 1
		
		//Push index to results array if it is valid
		if (row > 0 && !this.isJoined(up, start) && this.sites.board[up] === 1) {
			openings.push(up)
		}

		if (row < (n - 1) && !this.isJoined(down, start) && this.sites.board[down] === 1) {
			openings.push(down)
		}

		if (col > 0 && !this.isJoined(left, start) && this.sites.board[left] === 1) {
			openings.push(left)
		}

		if (col < (n - 1) && !this.isJoined(right, start) && this.sites.board[right] === 1) {
			openings.push(right)
		}
		return openings
	}

	this.addUnion = function(x, y) {
		const yRoot = this.findRoot(y);
		const xRoot = this.findRoot(x);

		if (yRoot === xRoot) {return false;}

		//Add the smaller tree to be a parent of the larger one
		if (this.size[xRoot] < this.size[yRoot]) {
			this.id[xRoot] = yRoot;
			this.size[yRoot] += this.size[xRoot];
		} else {
			this.id[yRoot] = xRoot;
			this.size[xRoot] += this.size[yRoot];
		}
		return this.id;
	}

	this.isJoined = function (x, y) {
		const yRoot = this.findRoot(y);
		const xRoot = this.findRoot(x);

		return yRoot === xRoot;
	}

	this.doesPerculate = function () {
		return this.isJoined(topIndex, bottomIndex)
	}
}

const runTrials = function(trials, boardSize) {
	const results = [];
	for (var i = 0; i < trials; i++) {
		let trial = new Percolation(boardSize)
		while (!trial.doesPerculate()) {
			trial.openRandom();
		}
		results.push(trial.sites.open)
	}

	const totalOpenings = results.reduce((acc, val, i) => {
		return acc + val;
	})
	return totalOpenings / (boardSize * boardSize * trials)
}

console.log(runTrials(1000, 50))