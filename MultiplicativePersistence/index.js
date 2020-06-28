//note: this code is based on built-in javascript functionality which does not work on safari or internet explorer
//also, might need future optimization since most browsers treat lengthy processes as possible crashes
//testing longer numbers than this caused chrome to want to close the page

function multiplicativePersistence(inputA = BigInt("1")){
  var steps = 0;
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

function setup() {
  noCanvas();
  tester = BigInt("0");
  while(tester.toString().length < 5){
    htmlPrinter = createP(tester.toString() + " : " + multiplicativePersistence(tester));
    tester += 1n;
  }
}