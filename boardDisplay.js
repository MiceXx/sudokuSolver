var boardDisplay = {

    sudokuBoard: [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ],

    retrieveBoard: function(){
        this.sudokuBoard = [];
        var board = document.getElementById("sudokuBoard");
        for(var i=0;i<9;i++){
            var boardRow = board.rows[i];
            var tempArray = [];
            for(var j=0;j<9;j++){
                var boardCell = boardRow.children[j];
                var cellValue = Number(boardCell.innerHTML);
                if(cellValue > 9){
                    this.showErrorMessage("INVALID INPUT: Values must be between 1 and 9");
                    return;
                }
                else if(isNaN(cellValue)){
                    cellValue = 0;
                }
                tempArray.push(cellValue);
            }
            this.sudokuBoard.push(tempArray);
        }
    },

    showErrorMessage: function(message){
        document.getElementById("error-container").innerHTML = message;
    },

    clearErrorMessage: function(){
        document.getElementById("error-container").innerHTML = "";
    },

    setBoardValue: function(i,j,n){
        this.sudokuBoard[i][j] = n;
        console.log(i,j);
    }
}

function solveButton(){
    boardDisplay.showErrorMessage("");
}

document.onkeyup = function(e) {
    boardDisplay.clearErrorMessage();
    if(e.keyCode < 49 || e.keyCode > 57){
        e.preventDefault();
        boardDisplay.showErrorMessage("Invalid input");
    }
    if(e.target.tagName === "TD"){
        var i = e.target.parentElement.rowIndex;
        var j = e.target.cellIndex;
        var n = Number(e.key);
        boardDisplay.setBoardValue(i,j,n);
    }
    
}