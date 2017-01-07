// public class Percolation {
//    public    void open(int row, int col)    // open site (row, col) if it is not open already
//    public boolean isOpen(int row, int col)  // is site (row, col) open?
//    public boolean isFull(int row, int col)  // is site (row, col) full?
//    public     int numberOfOpenSites()       // number of open sites
//    public boolean percolates()              // does the system percolate?

//    public static void main(String[] args)   // test client (optional)
// }

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
	this.sites.board = new Array(n*n).fill(0);
	
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

	console.log(this.id)

	/*==== Functionality ====*/
	this.openRandom = function() {
		if (this.sites.open === this.sites.total) {
			throw new Error('All sites already open')
		}

		let randomIndex = Math.floor(Math.random() * this.sites.total);
		while (this.sites.board[randomIndex] != 0) {
			randomIndex = Math.floor(Math.random() * this.sites.total);
		}

		this.sites.board[randomIndex] = 1;
		this.sites.open += 1;
		console.log('randomIndex', randomIndex)
		//Look up, down, left and right and call addUnion
		const inboundsOptions = this.getInboundsOptions(randomIndex);

		for (var i = 0; i < inboundsOptions.length; i++) {
			this.addUnion(randomIndex, inboundsOptions[i])
		}

		console.log('Board', this.sites.board)
		console.log('ID', this.id)
		
	}

	this.findRoot = function(index) {
		while (index != this.id[index]) {
			index = this.id[index]
		}
		return index;
	}

	this.getInboundsOptions = function (start) {
		if (start < 0 || start >= n*n) {throw new Error('Input provided is out of bounds')}
		
		let openings = [];
		const row = Math.floor(start / n);
		const col = start % n;

		const up = (row - 1) * n + col
		const down = (row + 1) * n + col
		const left = start - 1;
		const right = start + 1
		
		if (row > 0 && !this.isJoined(up, start) && this.sites.board[up] === 1) {
			console.log(start, ' joining with ', up)
			openings.push(up)
		}

		if (row < (n - 1) && !this.isJoined(down, start) && this.sites.board[down] === 1) {
			console.log(start, ' joining with ', down)
			openings.push(down)
		}

		if (col > 0 && !this.isJoined(left, start) && this.sites.board[left] === 1) {
			console.log(start, ' joining with ', left)
			openings.push(left)
		}

		if (col < (n - 1) && !this.isJoined(right, start) && this.sites.board[right] === 1) {
			console.log(start, ' joining with ', right)
			openings.push(right)
		}
		return openings
	}

	this.convert2dto1d = function(x, y) {
		if (x < 0 || x >= n || y < 0 || y >= n){
			return false;
		} else {
			return x * n + y;
		}
	}

	this.addUnion = function(x, y) {
		const yRoot = this.findRoot(y);
		const xRoot = this.findRoot(x);

		if (yRoot === xRoot) {return false;}

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
		// console.log('isJoined', x, y, xRoot, yRoot)
		return yRoot === xRoot;
	}

	this.doesPerculate = function () {
		return this.isJoined(topIndex, bottomIndex)
	}
}

const t = new Percolation(3)
// t.openRandom();
// this.doesPerculate
// t.openRandom();
// this.doesPerculate
// t.openRandom();
// this.doesPerculate
