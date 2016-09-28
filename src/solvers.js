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

  var permutations = findNRooksSolution(n);
  // permutations for n === 3 => [[1,0,0],[0,1,0],[0,0,1]]
  // permutations for n === 2 => [[1,0],[0,1]]
  var loop = function (num, accumulator, rookIndex) {
    // could checkConflict function be replaced by array that marks the columns where a rook is sitting? like bitwise nqueens
    var conflict = checkForConflict(accumulator, rookIndex);
    if ( num === 0 && !conflict) {
      solutionCount += 1;
      return;
    } 
    if (conflict === false) {
      permutations.forEach(function(permutation, permutationRookIndex) {
        loop(num - 1,  accumulator.concat([permutation]), permutationRookIndex);
      });
    }
  };
  loop(n, []);
  // console.log('============== FINISHED ====================================================================')
  // console.log(JSON.stringify(solutionCount));
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionBoard = new Board({n: n});
  var currIndex = n > 3 ? 1 : 0;
  if (n === 2 || n === 3) {
    return solutionBoard.rows();
  }
  for (var i = 0; i < solutionBoard.rows().length; i++) {
    solutionBoard.togglePiece(i, currIndex);
    if ((currIndex + 2) >= solutionBoard.rows().length) {
      currIndex = n > 3 && n !== 8 ? 0 : 1;
    } else {
      currIndex += 2;
    }
  }
  console.log(JSON.stringify(solutionBoard.rows()));
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionBoard));
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
      for (var i = 0; i < n; i++) {
        newBoard.togglePiece(currRow, i);
        // if no conflict recurse
        if (!newBoard.hasAnyQueenConflictsOn(currRow, i)) {
          placeQueens(currRow + 1);
        }
        newBoard.togglePiece(currRow, i);
      }
    }
  };
  placeQueens(0);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



