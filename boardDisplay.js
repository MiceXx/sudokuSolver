var boardDisplay = {

    sudokuBoard: [],
    
    displayBoard: function(){
        var board = document.getElementById("sudokuBoard");
        this.sudokuBoard.forEach(function(i,idx_i){
            var boardRow = board.rows[idx_i];
            var temp = "|";
            i.forEach(function(j,idx_j){
                temp = temp + j + "|";
                var boardCell = boardRow.children[idx_j];
            });            
            console.log(temp);
        });
        console.log();
    },

    retrieveBoard: function(){
        var board = [];
        var rows = document.getElementById("sudokuBoard").rows;
        this.clearErrorMessage();
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
        this.displayBoard();
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

function solveButton(){
    boardDisplay.showErrorMessage("");
}

document.onkeyup = function(e) {
    /*
    boardDisplay.clearErrorMessage();
    if(e.target.tagName === "TD"){
        if(e.keyCode < 49 || e.keyCode > 57){
            e.preventDefault();
            boardDisplay.showErrorMessage("Invalid input");
        }
        var i = e.target.parentElement.rowIndex;
        var j = e.target.cellIndex;
        var n = Number(e.key);
        boardDisplay.setBoardValue(i,j,n);
    }
    */
    if(e.target.tagName === "TD"){
        boardDisplay.retrieveBoard();
    }
}