var boardDisplay = {

    sudokuBoard: [],

    retrieveBoard: function(){
        this.clearErrorMessage();
        var board = [];
        var rows = document.getElementById("sudokuBoard").rows;
        for(var i=0;i<9;i++){
            var cells = rows[i].cells;
            var tempArray = [];
            for(var j=0;j<9;j++){
                var cellValue = Number(cells[j].textContent);
                if(cellValue > 9){
                    this.showErrorMessage("INVALID INPUT: Values must be between 1 and 9");
                    return;
                }
                else if(isNaN(cellValue)){
                    this.showErrorMessage("INVALID INPUT: Only numbers may be entered");
                    cellValue = 0;
                }
                tempArray.push(cellValue);
            }
            board.push(tempArray);
        }
        this.sudokuBoard = board;
    },

    showErrorMessage: function(message){
        document.getElementById("error-container").innerHTML = message;
    },

    clearErrorMessage: function(){
        document.getElementById("error-container").innerHTML = "";
    },

    setBoardValue: function(i,j,n){
        this.sudokuBoard[i][j] = n;
    }
}

var boardButtons = {
    reset: function(){
        boardDisplay.clearErrorMessage();
            var rows = document.getElementById("sudokuBoard").rows;
            for(var i=0;i<9;i++){
                var cells = rows[i].cells;
                var tempArray = [];
                for(var j=0;j<9;j++){
                    cells[j].textContent = "";
                }
            }
    },
    solve: function(){
        boardDisplay.retrieveBoard();
   //     sudoku.setBoard(boardDisplay.sudokuBoard);
   //     sudoku.fillSingleValueBlanks();
        var solver = new Solver();
        solver.board = boardDisplay.sudokuBoard;
        if(solver.solve()){
            sudoku.board = solver.board;
            sudoku.displayBoard();
        } else{
            boardDisplay.showErrorMessage("This Puzzle has no solution");
        }
    }
}

document.onkeyup = function(e) {
    if(e.target.tagName === "TD"){
        boardDisplay.retrieveBoard();
    }
}
