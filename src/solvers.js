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
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // // Problem could be easily solved by calculating the factorial of n
  // var result = 1;
  // for (var i = 1; i <= n; i++) {
  //   result *= i;
  // }
  // solutionCount = result;
  var checkForConflict = function(arrayOfArrays, rookIndex) {

    if (arrayOfArrays.reduce(function(accum, value) {
      if (value[rookIndex] === 1) {
        accum++;
      }
      return accum;
    }, 0) > 1) {
      return true;
    }
    return false;
  };
  var options = findNRooksSolution(n);
  // options = [[1,0,0],[0,1,0],[0,0,1]]
  // options = [[1,0],[0,1]]
  var loop = function (num, accumulator, rookIndex) {
    var conflict = checkForConflict(accumulator, rookIndex);
    if ( num === 0 && !conflict) {
      solutionCount += 1;
      return;
    } 
    if (conflict === false) {
      options.forEach(function(option, index) {
        loop(num - 1,  accumulator.concat([option]), index);
      });
    }
  };
  loop(n, []);
  console.log('============== FINISHED ====================================================================')
  console.log(JSON.stringify(solutionCount));
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionBoard = new Board({n: n});
  var currIndex = 0;
  for (var i = 0; i < solutionBoard.rows().length; i++) {
    solutionBoard.togglePiece(i, currIndex);
    console.log(JSON.stringify(solutionBoard));
    if (currIndex === solutionBoard.rows().length) {
      currIndex = 1;
    } else {
      currIndex += 2;
    }
  }

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  console.log(JSON.stringify(solutionBoard.rows()));
  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var newBoard = new Board({n: n});

  var placeQueens = function(currRow) {
    if (currRow === n) {
      solutionCount += 1;
      return;
    } else {
      for (var i = 0; i < newBoard.rows()[currRow].length; i++) {
        newBoard.togglePiece(currRow, i);
        // if no conflict recurse
        if (!(newBoard.hasAnyQueenConflictsOn(currRow, i))) {
          placeQueens(currRow + 1); 
        }
        // toggle piece
        newBoard.togglePiece(currRow, i);
      }
    }
  };
  placeQueens(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};





































