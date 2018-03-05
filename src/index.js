module.exports = function solveSudoku(matrix) {
    solve(new Cell(0, 0));

    function solve(cell) {
        if (cell === null) {
            return true;
        }
        if (matrix[cell.row][cell.col] !== 0) {
            return solve(getNext(cell));
        }
        for (let c = 1; c <= 9; c++) {
            let valid = isValid(cell, c);
            if (!valid) {
                continue;
            }
            matrix[cell.row][cell.col] = c;
            let solved = solve(getNext(cell));
            if (solved) {
                return true;
            } else {
                matrix[cell.row][cell.col] = 0;
            }
        }
        return false;
    }

    function isValid(cell, value) {
        for (let c = 0; c < 9; c++) {
            if (matrix[cell.row][c] === value) {
                return false;
            }
        }
        for (let r = 0; r < 9; r++) {
            if (matrix[r][cell.col] === value) {
                return false;
            }
        }
        let x1 = Math.floor(cell.row / 3);
        let y1 = Math.floor(cell.col / 3);

        for (let r1 = x1 * 3; r1 < x1 * 3 + 3; r1++) {
            for (let c1 = y1 * 3; c1 < y1 * 3 + 3; c1++) {
                if (r1 !== cell.row && c1 !== cell.col && matrix[r1][c1] === value) {
                    return false;
                }
            }
        }
        return true;
    }

    function getNext(cell) {
        let row = cell.row;
        let col = cell.col;
        col++;
        if (col > 8) {
            col = 0;
            row++;
        }
        if (row > 8) {
            return null;
        }
        return new Cell(row, col);
    }

    return matrix;
};

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}
