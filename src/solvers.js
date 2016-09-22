/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  var context = this;
  for (var i = 0; i < solution.rows().length; i++) {
    for (var j = 0; j < solution.rows()[i].length; j++) {
      solution.rows()[i][j] = 1;
      if (solution.hasAnyRooksConflicts()) {
        solution.rows()[i][j] = 0;
      }
    }
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = new Board({n: n});
  // // Problem could be easily solved by calculating the factorial of n
  // var result = 1;
  // for (var i = 1; i <= n; i++) {
  //   result *= i;
  // }
  // solutionCount = result;
  var result = [];

  var placeRooks = function(funcBoard, row, place) {
    var newBoard = _.clone(funcBoard) || new Board({n: n});
    if (funcBoard) {
      newBoard.n = funcBoard.rows().map(function(board) {
        return board.map(function(element) {
          return element;
        });
      });
    }
    console.log(JSON.stringify(newBoard.rows()), row, place, 'cloned');
    var run = true;
    if (newBoard._isInBounds(row, place)) {
      newBoard.togglePiece(row, place);
      console.log(JSON.stringify(newBoard.rows()), row, place, 'placed');
      if (newBoard.hasAnyRooksConflicts()) {
        console.log(newBoard.hasAnyRooksConflicts(), 'CONFLICT');
        newBoard.togglePiece(row, place);
        run = false;
      }
    }
    if (run) {
      console.log('i am called', JSON.stringify(newBoard.rows()), row, place);
      if (row === n - 1) {
        result.push(newBoard.rows());
        console.log(newBoard.rows(), 'pushed');
        return;
      }
      for (var i = 0; i < n; i++) {
        console.log('________________________________________________________________________________________')
        placeRooks(newBoard, row + 1, i);
      }
    }
  };

// board.matrix = thing.map(function(board) {return board.map(function(element) {return element})}


  for (var i = 0; i < n; i++) {
    console.log('for loop ran', i);
    console.log('================================================================================')
    placeRooks(undefined, 0, i);
  }

  console.log('Number of solutions for ' + n + ' rooks:', result.length, JSON.stringify(result));
  return result.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};





































