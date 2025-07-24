var ImageForColors;

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function preload() {
  ImageForColors = loadImage('image2.jpg');
  //example command for how to load the correct image using a relative path to the image
}

function setup() {
  createCanvas(1290,1552);

  ImageForColors.loadPixels();
  var tempArr = ImageForColors.pixels;
  ImageForColors.updatePixels();
  //console.log(tempArr.length);
  var outputArr = [];

  for(var i = 0; i < tempArr.length; i+=4){
    let tempR = tempArr[i];
    let tempG = tempArr[i+1];
    let tempB = tempArr[i+2];
    let tempA = tempArr[i+3];

    var pix = [tempR,tempG,tempB,tempA];
    var hexC = "#" + hex(tempR,2) + hex(tempG,2) + hex(tempB,2) + hex(tempA,2);
    outputArr.push(hexC);
  }
  //console.log(outputArr);

  var uniques = multiDimensionalUnique(outputArr);

  console.log(uniques);
  save(uniques,'output_hex.txt');
  noLoop();
}