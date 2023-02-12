//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded

//kruti-define the global variable
let musicband;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  //Add .json file here
  fetch("./json/musicband.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    //k-put data into variable that we declared at beginning
    musicband = data.musicband;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    //just a check message
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);
  textSize(10);
  text('Popularity of bands in United Kingdom', 10, 30);

}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<musicband.length; i++) {
    if ( musicband[i].amount > maxval) {
      maxval = musicband[i].amount;
    }
  }

  let spacing = 5;//spacing between the bars
  // Display chart
  for (let i=0; i<musicband.length; i++) {

    let item = musicband[i];
    
    let rWidth = width/(musicband.length+4); //add 2 so there is space either side of the chart
    let rX = map(i, 0, musicband.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.amount, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    fill(0); 
    textAlign(CENTER, TOP); 
    textSize(10);
    text(item.band, rX+rWidth/2-1, rY+10);
  }  
  
}