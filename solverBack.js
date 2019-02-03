<<<<<<< HEAD
function Solver() {
    this.board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
};

Solver.prototype.validate_row = function (r, c) {
    var value = this.board[r][c];
    for (var _c = 0; _c < 9; _c++) {
        if (_c != c && this.board[r][_c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_column = function (r, c) {
    var value = this.board[r][c];
    for (var _r = 0; _r < 9; _r++) {
        if (_r != r && this.board[_r][c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_box = function (r, c) {
    var value = this.board[r][c];
    var box_r = Math.floor(r / 3);
    var box_c = Math.floor(c / 3);

    for (var _r = box_r * 3; _r < box_r * 3 + 3; _r++) {
        for (var _c = box_c * 3; _c < box_c * 3 + 3; _c++) {
            if (_r != r && _c != c && this.board[_r][_c] == value) {
                return false;
            }
        }
    }
    return true;
};

Solver.prototype.backtrack = function (r, c) {
    c++;
    if (c > 8) {
        c = 0;
        r++;
        if (r > 8) {
            return true;
        }
    }

    if (this.board[r][c] != 0) {
        if (!(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
            return false;
        }
        return this.backtrack(r, c);
    } else {
        for (var x = 1; x < 10; x++) {
            this.board[r][c] = x;
            if (this.validate_row(r, c) &&  this.validate_column(r, c) && this.validate_box(r, c)){
                if (this.backtrack(r, c)) {
                    return true;
                }
            }
        }
        this.board[r][c] = 0;
        return false;
    }
};

Solver.prototype.solve = function () {
	for(var r = 0; r < 9; r++){
		for(var c = 0; c < 9; c++){
			if (this.board[r][c] != 0 && !(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
    			return false;
			}
		}
	}
    return this.backtrack(0, -1);
=======
function Solver() {
    this.board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
};

Solver.prototype.validate_row = function (r, c) {
    var value = this.board[r][c];
    for (var _c = 0; _c < 9; _c++) {
        if (_c != c && this.board[r][_c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_column = function (r, c) {
    var value = this.board[r][c];
    for (var _r = 0; _r < 9; _r++) {
        if (_r != r && this.board[_r][c] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_box = function (r, c) {
    var value = this.board[r][c];
    var box_r = Math.floor(r / 3);
    var box_c = Math.floor(c / 3);

    for (var _r = box_r * 3; _r < box_r * 3 + 3; _r++) {
        for (var _c = box_c * 3; _c < box_c * 3 + 3; _c++) {
            if (_r != r && _c != c && this.board[_r][_c] == value) {
                return false;
            }
        }
    }
    return true;
};

Solver.prototype.backtrack = function (r, c) {
    c++;
    if (c > 8) {
        c = 0;
        r++;
        if (r > 8) {
            return true;
        }
    }

    if (this.board[r][c] != 0) {
        if (!(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
            return false;
        }
        return this.backtrack(r, c);
    } else {
        for (var x = 1; x < 10; x++) {
            this.board[r][c] = x;
            if (this.validate_row(r, c) &&  this.validate_column(r, c) && this.validate_box(r, c)){
                if (this.backtrack(r, c)) {
                    return true;
                }
            }
        }
        this.board[r][c] = 0;
        return false;
    }
};

Solver.prototype.solve = function () {
	for(var r = 0; r < 9; r++){
		for(var c = 0; c < 9; c++){
			if (this.board[r][c] != 0 && !(this.validate_row(r, c) && this.validate_column(r, c) && this.validate_box(r, c))){
    			return false;
			}
		}
	}
    return this.backtrack(0, -1);
>>>>>>> d668704f85f1c20ffb831f2c04c6abf2c3fd5254
};