var boardDisplay = {
    sudokuBoard: [
        [0, 8, 4, 0, 0, 5, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 5, 0],
        [0, 0, 7, 0, 9, 0, 0, 0, 4],
        [7, 0, 5, 0, 8, 0, 0, 0, 0],
        [0, 9, 0, 7, 0, 1, 0, 6, 0],
        [0, 2, 1, 0, 4, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 8, 0, 0],
        [0, 0, 0, 0, 7, 0, 6, 9, 2],
        [0, 0, 0, 6, 0, 3, 4, 7, 0]
    ],

    displayBoard: function () {
        var board = document.getElementById("sudokuBoard");
        this.sudokuBoard.forEach(function (i, idx_i) {
            var boardRow = board.rows[idx_i];
            i.forEach(function (j, idx_j) {
                var boardCell = boardRow.children[idx_j];
                if (j !== 0) {
                    boardCell.innerHTML = j;
                }
            });
        });
    },

    retrieveBoard: function () {
        this.clearErrorMessage();
        var board = [];
        var rows = document.getElementById("sudokuBoard").rows;
        for (var i = 0; i < 9; i++) {
            var cells = rows[i].cells;
            var tempArray = [];
            for (var j = 0; j < 9; j++) {
                var cellValue = Number(cells[j].textContent);
                if (cellValue > 9) {
                    this.showErrorMessage("INVALID INPUT: Values must be between 1 and 9");
                    return;
                }
                else if (isNaN(cellValue)) {
                    this.showErrorMessage("INVALID INPUT: Only numbers may be entered");
                    cellValue = 0;
                }
                tempArray.push(cellValue);
            }
            board.push(tempArray);
        }
        this.sudokuBoard = board;
    },

    showErrorMessage: function (message) {
        document.getElementById("error-container").innerHTML = `<div id='error-message'>${message}</div>`
    },

    clearErrorMessage: function () {
        document.getElementById("error-container").innerHTML = "";
    },

    setBoardValue: function (i, j, n) {
        this.sudokuBoard[i][j] = n;
    }
}

var boardButtons = {
    reset: function () {
        boardDisplay.clearErrorMessage();
        var rows = document.getElementById("sudokuBoard").rows;
        for (var i = 0; i < 9; i++) {
            var cells = rows[i].cells;
            for (var j = 0; j < 9; j++) {
                cells[j].textContent = "";
            }
        }
    },
    solve: function () {
        boardDisplay.retrieveBoard();
        var solver = new Solver();
        solver.board = boardDisplay.sudokuBoard;
        if (solver.solve()) {
            boardDisplay.sudokuBoard = solver.board;
            boardDisplay.displayBoard();
        } else {
            boardDisplay.showErrorMessage("This Puzzle has no solution");
        }
    }
}

document.onkeyup = function (e) {
    if (e.target.tagName === "TD") {
        boardDisplay.retrieveBoard();
    }
}

boardDisplay.displayBoard();