//answer:
/*
984/135/726
312/467/958
567/892/314

735/286/149
498/751/263
621/349/587

276/914/835
143/578/692
*/

var sudoku = {
    board: [
        [0,8,4,0,0,5,0,0,0],
        [0,1,0,0,0,0,0,5,0],
        [0,0,7,0,9,0,0,0,4],
        [7,0,5,0,8,0,0,0,0],
        [0,9,0,7,0,1,0,6,0],
        [0,2,1,0,4,0,0,0,0],
        [0,0,0,0,0,4,8,0,0],
        [0,0,0,0,7,0,6,9,2],
        [0,0,0,6,0,3,4,7,0]
    ],

    possibleValuesBoard: [
        [],[],[],
        [],[],[],
        [],[],[]
    ],
    
    displayBoard: function(){
        var board = document.getElementById("sudokuBoard");
        this.board.forEach(function(i,idx_i){
            var boardRow = board.rows[idx_i];
            i.forEach(function(j,idx_j){
                var boardCell = boardRow.children[idx_j];
                if(j !== 0){
                    boardCell.innerHTML = j;
                }
            });
        });
    },
    displaytest: function(){
        this.possibleValuesBoard.forEach(function(i){
            var row = "|"
            i.forEach(function(j){
                row += j + "|";
            });
            console.log(row);
        });
    },

    findValidNumbers: function(i,j){
        var f = function(element){
                var index = possibleValues.indexOf(element);
                if(index > -1){
                    possibleValues.splice(index, 1);
                }
            }
        if(this.board[i][j] !== 0){
            return [this.board[i][j]];
        }
        var rowValues = this.getRow(i);
        var colValues = this.getColumn(j);
        var gridValues = this.getGrid(i,j);

        var possibleValues = [1,2,3,4,5,6,7,8,9];

        rowValues.forEach(f);
        colValues.forEach(f);
        gridValues.forEach(f);
        return possibleValues;
    },

    checkPossibilitiesExist: function(){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                var numValues = this.possibleValuesBoard[i][j].length;
                if(numValues < 1){
                    return false;
                }
            }
        }
        return true;
    },

    checkComplete: function(){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                if(this.board[i][j] === 0){
                    return false;
                }
            }
        }
        return true;
    },

    fillSingleValueBlanks: function(){
        this.getPossibleValuesBoard();
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                var numValues = this.possibleValuesBoard[i][j].length;
                if(numValues < 1){
                    boardDisplay.showErrorMessage("Puzzle has no solution");
                    return;
                }
                if(numValues === 1 && this.board[i][j] === 0){
                    var value = this.possibleValuesBoard[i][j][0];
                    this.board[i][j] = value;

                    this.displayBoard();
                    this.updatePossibleValuesBoard(i,j,value);
                    i = 0;
                    j = -1;
                }
            }
        }
    },

    getPossibleValuesBoard: function(){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                this.possibleValuesBoard[i][j] = this.findValidNumbers(i,j);
            }
        }
        this.displaytest();
    },

    updatePossibleValuesBoard: function(i,j,n){
        //Updates the possible values board based on a number being filled in
        for(var idx_i=0;idx_i<9;idx_i++){
            if(idx_i ===i){
                continue;
            }
            var possibleValues = this.possibleValuesBoard[idx_i][j];
            var index = possibleValues.indexOf(n);
            if(index > -1){
                possibleValues.splice(index, 1);
            }
        }
        for(var idx_j=0;idx_j<9;idx_j++){
            if(idx_j ===j){
                continue;
            }
            var possibleValues = this.possibleValuesBoard[i][idx_j];
            var index = possibleValues.indexOf(n);
            if(index > -1){
                possibleValues.splice(index, 1);
            }
        }
        
        var gridIndex = this.getGridIndices(i,j);
        for(var idx_i=gridIndex.lowerx;idx_i<gridIndex.upperx;idx_i++){
            for(var idx_j=gridIndex.lowery;idx_j<gridIndex.uppery;idx_j++){
                if(idx_i === i && idx_j === j){
                    continue;
                }
                var possibleValues = this.possibleValuesBoard[idx_i][idx_j];
                var index = possibleValues.indexOf(n);
                if(index > -1){
                    possibleValues.splice(index, 1);
                }
            }
        }
    },

    getRow: function(i){
        return this.board[i];
    },

    getColumn: function(j){
        var col = [];
        for(var i=0;i<9;i++){
            col.push(this.board[i][j]);
        }
        return col;
    },

    getGrid: function(i,j){
        var grid = [];
        var gridIndex = this.getGridIndices(i,j);
        for(var idx_i=gridIndex.lowerx;idx_i<gridIndex.upperx;idx_i++){
            for(var idx_j=gridIndex.lowery;idx_j<gridIndex.uppery;idx_j++){
                grid.push(this.board[idx_i][idx_j]);
            }
        }
        return grid;
    },

    checkValidArray: function(inputArray){
        var arraySum = inputArray.reduce(function(item, total){
            return total += item;
        });
        if(arraySum !== 45){
            return false;
        }
    
        var sortedArray = inputArray.slice().sort();
        sortedArray.forEach(function(value,position){
            if(value !== position){
                return false;
            };
        });
        return true;
    },

    getGridIndices: function(i,j){
        var gridIndex ={};
        
        if(i < 3){
            gridIndex.lowerx = 0;
            gridIndex.upperx = 3;
        } else if(i < 6){
            gridIndex.lowerx = 3;
            gridIndex.upperx = 6;
        } else{
            gridIndex.lowerx = 6;
            gridIndex.upperx = 9;
        }

        if(j < 3){
            gridIndex.lowery = 0;
            gridIndex.uppery = 3;
        } else if(j < 6){
            gridIndex.lowery = 3;
            gridIndex.uppery = 6;
        } else{
            gridIndex.lowery = 6;
            gridIndex.uppery = 9;
        }
        return gridIndex;
    },

    setBoard: function(arr){
        this.board = arr;
    }

}


sudoku.displayBoard();

sudoku.getPossibleValuesBoard();