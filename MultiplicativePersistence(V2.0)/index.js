//note: this code is based on built-in javascript functionality which does not work on safari or internet explorer
//also, might need future optimization since most browsers treat lengthy processes as possible crashes
//testing longer numbers than this caused chrome to want to close the page
let hashmap = new Map();
let output = "";
let htmlPrinter;

function multiplicativePersistence(inputA = BigInt("1")){
  var steps = BigInt("0");
  str = inputA.toString();
  counter = BigInt("1");
  while(str.length > 1){
    for (var i = 0; i < str.length; i++) {
      counter *= BigInt(str.charAt(i));
    }
    str = counter.toString();
    counter = BigInt("1");
    steps++;
  }
  return steps;
}

var tester;

function setup() {
  noCanvas();
  tester = BigInt("0");
  htmlPrinter = createP(output);
}

//TODO: update to use map function so it doesnt fill up the screen with useless info
function draw(){
  let val = multiplicativePersistence(tester);
  if(!hashmap.has(val)){
    hashmap.set(val,tester);
  }
  hashmap.forEach(function(value, key) {
    output += key.toString() + ' : ' + value.toString() + " ; ";
  })
  htmlPrinter.html(output);
  output = "";
  //htmlPrinter.remove();
  tester += 1n;
  if(tester.toString().length > 4){
    noLoop();
  }
}