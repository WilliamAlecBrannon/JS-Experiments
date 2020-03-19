var sudokuIn = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

function solveSudoku(Input) {
  recursiveSolve(Input, 0, 0);
  return Input;
}

function recursiveSolve(Input, x, y) {
  //x = row number (starting 0)
  //y = col number (starting 0)
  let OldX = x;
  let OldY = y;
  if (Input[x][y] != 0) {
    if (x == 8 && y == 8) {
      return;
    }
    if (y == 8) {
      y = 0;
      x++;
    } else {
      y++;
    }
    recursiveSolve(Input, x, y);
  } else {
    for (let i = 1; i < 10; i++) {
      if (isValidSpot(Input, x, y, i)) {
        Input[x][y] = i;
        if (x == 8 && y == 8) {
          return;
        }
        if (y == 8) {
          y = 0;
          x++;
        } else {
          y++;
        }
        recursiveSolve(Input, x, y);
      }
      if (TwoDarraySearch(Input, 0)) {
        Input[OldX][OldY] = 0;
        x = OldX;
        y = OldY;
      }
    }
  }
}

function TwoDarraySearch(Input, n) {
  let out = false;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Input[i][j] == n) {
        out = true;
      }
    }
  }
  return out;
}

function isValidSpot(Input, x, y, n) {
  if (Input[x][y] != 0) {
    return false;
  }
  for (let i = 0; i < 9; i++) {
    if (Input[x][i] == n) {
      return false;
    }
    if (Input[i][y] == n) {
      return false;
    }
  }
  let xBox = Math.floor(x/3) * 3;
  let yBox = Math.floor(y/3) * 3;
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      if (Input[xBox + a][yBox + b] == n) {
        return false;
      }
    }
  }
  return true;
}

function makeTable(array) {
  //https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
  let table = document.createElement('table');
  for (let i = 0; i < array.length; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < array[i].length; j++) {
      let cell = document.createElement('td');
      cell.textContent = array[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

function setup() {
  noCanvas();
  createP("Original");
  document.body.appendChild(makeTable(sudokuIn));
  var sudokuOut = solveSudoku(sudokuIn);
  createP("Final");
  document.body.appendChild(makeTable(sudokuOut));
}