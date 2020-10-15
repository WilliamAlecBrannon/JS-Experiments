//generates an one-dimensional array of values included up to line N of Pascal's triangle
//based on https://www.geeksforgeeks.org/pascal-triangle/ method 3
function pascalGenerator(lines = 1n){
  var pascalArray = [];
  for (a = 1n; a <= lines; a++) 
  { 
    C = 1n; // used to represent C(line, i) 
    for (i = 1n; i <= a; i++)  
    { 
          
        // The first value in a line is always 1 
        pascalArray.push(C);  
        C = C * (a - i) / i;  
    }
  }
  return pascalArray;
}

//returns a value for the percentage of odd numbers present in the first N lines of Pascal's triangle
function pascalOddPercentage(lines = 1n){
  var counter = 0n;
  var testArray = pascalGenerator(lines);
  var nums = testArray.length;
  for(i = 0; i < nums; i++){
    if(testArray[i] % 2n != 0n){
      counter++;
    }
  }
  //has a precision of 7 digits because conversion from fraction into decimal representation is really tricky with the datatypes I was using, can be tweaked
  return Number(counter * 10000000n / BigInt(nums)) / 100000;
}

function setup() {
  noCanvas();
}

var tester = 128n;//endRowValue
var b = 1n; //startRowValue

function draw(){
  if(b <= tester){
    var bString = b.toString();
    createP("The percentage of odd numbers in the first " + bString + " lines of Pascal's triangle is %" + pascalOddPercentage(b));
    b++;
  }
}