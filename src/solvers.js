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
  var solutionCount = new Board({n: n});
  // // Problem could be easily solved by calculating the factorial of n
  // var result = 1;
  // for (var i = 1; i <= n; i++) {
  //   result *= i;
  // }
  // solutionCount = result;
  var checkForConflict = function(arrayOfArrays) {
    for (var i = 0; i < arrayOfArrays.length; i++) {
      if (arrayOfArrays.reduce(function(accum, value) {
        if (value[i] === 1) {
          accum++;
        }
        return accum;
      }, 0) > 1) {
        return true;
      }
    }
    return false;
  };
  var result = 0;
  var options = findNRooksSolution(n);
  // options = [[1,0,0],[0,1,0],[0,0,1]]
  // options = [[1,0],[0,1]]
  var loop = function (num, accumulator) {
    //console.log(num, 'accumulator: ', JSON.stringify(accumulator));
    // if (accumulator.length <= n) {
    //   var newAcc = accumulator.slice();
    //   while (newAcc.length < n) {
    //     newAcc.push(filler);
    //   }
    //   var checkBoard = new Board(newAcc);
    //   var conflict = checkBoard.hasAnyRooksConflicts();
    //   //console.log('newAcc', JSON.stringify(newAcc), JSON.stringify(accumulator), conflict);
    // }
    var conflict = checkForConflict(accumulator);
    if ( num === 0 && !conflict) {
       // console.log('pushing', JSON.stringify(accumulator));
      //result.push(accumulator);
      result += 1;
      return;
    }
    if (conflict === false) {
      options.forEach(function(option) {
        loop(num - 1,  accumulator.concat([option]));
      });
    }
  };
  loop(n, []);
  console.log('============== FINISHED ====================================================================')
  console.log(JSON.stringify(result));
  return result;
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





































