let redSlider;
let greenSlider;
let blueSlider;
let strokeSlider;
let menue;
let doodle;
let RBV, rV, gV, bV, rRBV, gRBV, bRBV;
let RBArrayVal;
let alphaSlider;
let whileVar;
let newMouseX, pnewMouseX, newMouseY, pnewMouseY;
let canRewidth, canReheight, canRetext;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
//extra menue
  menue = createGraphics(windowWidth, windowHeight);
  menue.clear();
  
//sliders
  redSlider = createSlider(0, 255, 100);
  redSlider.position((width/600)*7, (height/400)*20);
  redSlider.size((width/600)*130);
  greenSlider = createSlider(0, 255, 100);
  greenSlider.position((width/600)*7, (height/400)*55);
  greenSlider.size((width/600)*130);
  blueSlider = createSlider(0, 255, 100);
  blueSlider.position((width/600)*7, (height/400)*90);
  blueSlider.size((width/600)*130);
  strokeSlider = createSlider(1, 20, 1);
  strokeSlider.position((width/600)*7, (height/400)*230);
  strokeSlider.size((width/600)*130);
  alphaSlider = createSlider(0, 255, 255);
  alphaSlider.position((width/600)*7, (height/400)*290);
  alphaSlider.size((width/600)*130);

//turns drawing ability on (1) or off (0)
  doodle = 1;

//for rainbow pen
  rRBV = 255;
  gRBV = 26;
  bRBV = 3;
  rV = [255, 255, 255, 61, 0, 1, 228];
  gV = [26, 106, 205, 255, 230, 17, 0];
  bV = [3, 5, 1, 0, 255, 255, 255];
  RBV = 0;
  RBArrayVal = 0;
  
//stops buttons from spamming signals
  whileVar = 1;
  
//resizes the menue
  canRewidth = width/600;
  canReheight = height/400;
  canRetext = (width+height)/1000;
}

function draw() {
//resizes everything thats drawn
  scale(width/600, height/400);
  
//scales mouse position to resized canvas
  newMouseX = mouseX*(600/width);
  pnewMouseX = pmouseX*(600/width);
  newMouseY = mouseY*(400/height);
  pnewMouseY = pmouseY*(400/height);
  
//values from sliders
  const r = redSlider.value();
  const g = greenSlider.value();
  const b = blueSlider.value();
  const str = strokeSlider.value();
  const opacity = alphaSlider.value();

//all interactions
  if(mouseIsPressed) {
//if 'More +' button is pressed, create menue
    if(newMouseX > 20 && newMouseX <130 && newMouseY > 360 && newMouseY < 390) {
      menue.fill(180);
      menue.noStroke();
      menue.rect(150*canRewidth, 0*canReheight, 300*canRewidth, 200*canReheight);
      menue.fill(160);
      menue.rect(425*canRewidth, 5*canReheight, 20*canRewidth, 20*canReheight);
      menue.fill(0);
      menue.textStyle(BOLD);
      menue.textSize(12*canRetext);
      menue.text('X', 430*canRewidth, 20*canReheight);
      menue.fill(150);
      menue.rect(180*canRewidth, 10*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(180*canRewidth, 60*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(180*canRewidth, 110*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(180*canRewidth, 160*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(310*canRewidth, 10*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(310*canRewidth, 60*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(310*canRewidth, 110*canReheight, 110*canRewidth, 30*canReheight);
      menue.rect(310*canRewidth, 160*canReheight, 110*canRewidth, 30*canReheight);
      menue.fill(0);
      menue.text('Rainbow', 210*canRewidth, 30*canReheight);
      menue.text('Empty', 210*canRewidth, 80*canReheight);
      menue.text('Empty', 210*canRewidth, 130*canReheight);
      menue.text('Empty', 210*canRewidth, 180*canReheight);
      menue.text('Empty', 340*canRewidth, 30*canReheight);
      menue.text('Empty', 340*canRewidth, 80*canReheight);
      menue.text('Empty', 340*canRewidth, 130*canReheight);
      menue.text('Save File', 340*canRewidth, 180*canReheight);
      menue.position(0, 0);
      menue.show();
      doodle = 0;
    }
//pen, uses slider values
    if (doodle == 1 && RBV == 0) {
      strokeWeight(str);
      stroke(r, g, b, opacity);
      line(newMouseX, newMouseY, pnewMouseX, pnewMouseY);
    }
//when X button pressed, closes menue
    if (newMouseX > 425 && newMouseX < 445 && newMouseY > 5 && newMouseY < 25) {
      if (doodle == 0) {
        menue.hide();
        doodle = 1;
      }
    }
//function for rainbow pen
    if (RBV == 1 && doodle == 1) {
      if(rRBV < rV[RBArrayVal]) {
        rRBV++;
      }
      if(rRBV > rV[RBArrayVal]) {
        rRBV--;
      }
      if(gRBV < gV[RBArrayVal]) {
        gRBV++;
      }
      if(gRBV > gV[RBArrayVal]) {
        gRBV--;
      }
      if(bRBV < bV[RBArrayVal]) {
        bRBV++;
      }
      if(bRBV > bV[RBArrayVal]) {
        bRBV--;
      }
      if(rRBV == rV[RBArrayVal] && gRBV == gV[RBArrayVal] && bRBV == bV[RBArrayVal]) {
        RBArrayVal++
        if(RBArrayVal == 7) {
          RBArrayVal = 0;
      }
      }
//draws with rainbow
      stroke(rRBV, gRBV, bRBV, opacity);
      strokeWeight(str);
      line(newMouseX, newMouseY, pnewMouseX, pnewMouseY);
    }
//reactions when menue buttons are pressed
  if(whileVar == 1) {
//button for rainbow pen
    if(newMouseX > 180 && newMouseX < 290 && newMouseY > 10 && newMouseY < 40 && doodle == 0) {
      if(RBV==0) {
        RBV = 1;
      }else{
        RBV = 0;
      }
      whileVar = 0;
    }
    if(newMouseX > 180 && newMouseX < 290 && newMouseY > 60 && newMouseY < 90 && doodle == 0) {
      
      whileVar = 0;
    }
    if(newMouseX > 180 && newMouseX < 290 && newMouseY > 110 && newMouseY < 140 && doodle == 0) {
      
      whileVar = 0;
    }
    if(newMouseX > 180 && newMouseX < 290 && newMouseY > 160 && newMouseY < 190 && doodle == 0) {
      
      whileVar = 0;
    }
    if(newMouseX > 310 && newMouseX < 420 && newMouseY > 10 && newMouseY < 40 && doodle == 0) {
      
      whileVar = 0;
    }
    if(newMouseX > 310 && newMouseX < 420 && newMouseY > 60 && newMouseY < 90 && doodle == 0) {
      
      whileVar = 0;
    }
    if(newMouseX > 310 && newMouseX < 420 && newMouseY > 110 && newMouseY < 140 && doodle == 0) {
      
      whileVar = 0;
    }
//button to save drawing
    if(newMouseX > 310 && newMouseX < 420 && newMouseY > 160 && newMouseY < 190 && doodle == 0) {
      saveCanvas('myCanvas', 'jpg');
      whileVar = 0;
    }
   }
  }
  
  //print(doodle, whileVar);
  
//main menue
  fill(200);
  noStroke();
  rect(0, 0, 150, 400);
//More + button
  fill(150);
  rect(20, 360, 110, 30);
  
//text for main menue
  fill(0);
  textSize(15);
  text('Red', 20, 50);
  text('Green', 20, 85);
  text('Blue', 20, 120);
  text('Stroke', 20, 260);
  text("Press 'c' to clear.", 20, 200);
  text('Opacity', 20, 320);
  text('More +', 50, 380);
  
//shows color, stroke, and opacity on main menue
  fill(r, g, b);
  rect(20, 135, 110, 40);
  stroke(0);
  strokeWeight(str);
  line(20, 217, 130, 217);
  strokeWeight(5);
  stroke(0, opacity);
  line(20, 277, 130, 277);
  
//when c is pressed, canvas is cleared
  if(keyIsPressed) {
   if (doodle == 1) {
    if(key == "c") {
      push();
        fill(255);
        noStroke();
        rect(150, 0, 600, 400);
      pop();
    }
   }
  }
}

//stops buttons from spamming signals
function mouseReleased() {
  whileVar = 1;
}