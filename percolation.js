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

		//Look up, down, left and right and call addUnion
		const inboundsOptions = this.getInboundsOptions(randomIndex);

		for (var i = 0; i < inboundsOptions.length; i++) {
			this.addUnion(randomIndex, inboundsOptions[i])
		}

		console.log(this.sites.board)
		console.log(this.id)
		
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

		if (row > 0) {
			const up = (row - 1) * n + col
			openings.push(up)
		}

		if (row < (n - 1)) {
			const down = (row + 1) * n + col
			openings.push(down)
		}

		if (col > 0) {
			const left = start - 1;
			openings.push(left)
		}

		if (col < (n - 1)) {
			const right = start + 1
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

		return yRoot === xRoot;
	}
}

const t = new Percolation(3)
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.openRandom();
// t.getInboundsOptions(4)
// t.openRandom();
// t.openRandom();
// t.openRandom();
// console.log(t.addUnion(4,3).toString() === ([ 0, 1, 2, 4, 4, 5, 6, 7, 8, 9 ]).toString())
// console.log(t.addUnion(3,8).toString() === ([ 0, 1, 2, 4, 4, 5, 6, 7, 4, 9 ]).toString())
// console.log(t.addUnion(6,5).toString() === ([ 0, 1, 2, 4, 4, 6, 6, 7, 4, 9 ]).toString())
// console.log(t.addUnion(9,4).toString() === ([ 0, 1, 2, 4, 4, 6, 6, 7, 4, 4 ]).toString())
// console.log(t.addUnion(2,1).toString() === ([ 0, 2, 2, 4, 4, 6, 6, 7, 4, 4 ]).toString())
// console.log(t.addUnion(5,0).toString() === ([ 6, 2, 2, 4, 4, 6, 6, 7, 4, 4 ]).toString())
// console.log(t.addUnion(7,2).toString() === ([ 6, 2, 2, 4, 4, 6, 6, 2, 4, 4 ]).toString())
// console.log(t.addUnion(6,1).toString() === ([ 6, 2, 6, 4, 4, 6, 6, 2, 4, 4 ]).toString())
// console.log(t.addUnion(7,3).toString() === ([ 6, 2, 6, 4, 6, 6, 6, 2, 4, 4 ]).toString())



// t.addUnion(1,2)
// t.addUnion(0,1)
// t.addUnion(0,1)
// t.addUnion(0,1)
// t.addUnion(0,1)
