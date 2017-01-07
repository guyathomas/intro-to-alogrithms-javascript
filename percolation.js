// public class Percolation {
//    public Percolation(int n)                // create n-by-n grid, with all sites blocked
//    public    void open(int row, int col)    // open site (row, col) if it is not open already
//    public boolean isOpen(int row, int col)  // is site (row, col) open?
//    public boolean isFull(int row, int col)  // is site (row, col) full?
//    public     int numberOfOpenSites()       // number of open sites
//    public boolean percolates()              // does the system percolate?

//    public static void main(String[] args)   // test client (optional)
// }

const Percolation = function (n) {
	// this.row = new Array(n).fill(1)
	// this.board = new Array(n).fill(this.row)
	// this.printBoard = function() {
	// 	console.log(this.board)
	// }
	// this.sites = {
	// 	total: n * n,
	// 	open: 0,
	// 	closed: n * n
	// }

	//Init the id array
	this.id = [];
	for (var i = 0; i < n*n; i++) {
		this.id[i] = i;
	}

	//Init the size array
	this.size = new Array(n*n).fill(1);

	this.findRoot = function(index) {
		while (index != this.id[index]) {
			index = this.id[index]
		}
		return index;
	}

	this.convert2dto1d = function(x,y) {
		if (x < 0 || x >= n || y < 0 || y >= n){
			throw new Error('Coordinates out of bounds')
		}

		return x * n + y;
	}
	this.printBoard = function () {
		console.log(this.id)
	}
}

const t = new Percolation(3)
// console.log(t.convert2dto1d(1,2))
console.log('Root of 5:', t.findRoot(5))
