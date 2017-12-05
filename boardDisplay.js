var boardDisplay = {

    sudokuBoard: [],

    retrieveBoard: function(){
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
    }
}

function solveButton(){
    boardDisplay.showErrorMessage("");
}