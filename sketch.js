var canvasWidth = 960;
var canvasHeight = 500;

var prevSec;
var millisRolloverTime;
var nextAlarm;
var debug_is_on = (typeof DEBUG !== 'undefined');

// Note - Edited this in an attempt to add a slider for the day as this clock also changes based on the current date. However this would have required piping a new variable (day) through to the draw_clock function - something which I was worried wasn't allowed under the scope of this project. As such I have not finished it off. However I have left my changes (here and in the debug.html and debug.js files) to highlight how I would have done this... (Also see note at bottom of this file)

function setup () {
  // create the drawing canvas, save the canvas element
  var main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');


  // this is true if debug.js is included
  if(debug_is_on) {
    debug_setup();
  }
  turn_off_alarm();
}

function turn_on_alarm() {
  nextAlarm = millis() + 10000;    // Edited this to be 10 seconds (to save time testing)
  print("Alarm on: T minus 10 seconds");  // Edited the text to match up to the new alarm time
}

function turn_off_alarm() {
  nextAlarm = -1;
  print("Alarm turned off");  
}

function mouseClicked() {
  if (debug_is_on && debugCheckbox.checked()) {
    return;
  }
  if (nextAlarm > 0) {
    turn_off_alarm();
  }
  else {
    turn_on_alarm();
  }
}

// taking ideas from http://cmuems.com/2016/60212/deliverables/deliverables-02/
function draw () {
  var H, M, S, mils, alarm;

  if (debug_is_on && debugCheckbox.checked()) {
    hourSlider.removeAttribute('disabled');
    minSlider.removeAttribute('disabled');
    secSlider.removeAttribute('disabled');
    millisSlider.removeAttribute('disabled');
    daySlider.removeAttribute('disabled'); //Added day slider
    alarmCheckbox.removeAttribute('disabled');
    alarmSlider.removeAttribute('disabled');

    H = hourSlider.value();
    M = minSlider.value();
    S = secSlider.value();
    mils = millisSlider.value();
    dateday = daySlider.value(); // Added day variable
    if (alarmCheckbox.checked()) {
      alarm = alarmSlider.value();
    }
    else {
      alarm = -1;
    }
  }
  else {
    // Fetch the current time
    H = hour();
    M = minute();
    S = second();
	var dateday = day();  // Added day variable
    if (nextAlarm > 0) {
      now = millis();
      var millis_offset = nextAlarm - now;
      if (millis_offset < -10000 ){
        // turn off alarm
        nextAlarm = -1;
        alarm = -1;
      }
      else if (millis_offset < 0) {
        alarm = 0;
      }
      else {
        alarm = millis_offset / 1000.0;
      }
    }
    else {
      alarm = -1;
    }

    // Reckon the current millisecond, 
    // particularly if the second has rolled over.
    // Note that this is more correct than using millis()%1000;
    if (prevSec != S) {
      millisRolloverTime = millis();
    }
    prevSec = S;
    mils = floor(millis() - millisRolloverTime);

    if (debug_is_on) {
      hourSlider.attribute('disabled','');
      minSlider.attribute('disabled','');
      secSlider.attribute('disabled','');
      millisSlider.attribute('disabled','');
      daySlider.attribute('disabled',''); // Added day slider
      alarmCheckbox.attribute('disabled','');
      alarmSlider.attribute('disabled','');

      hourSlider.value(H);
      minSlider.value(M);
      secSlider.value(S);
      millisSlider.value(mils);
      daySlider.value(dateday); // Added day slider
      alarmCheckbox.checked(alarm >= 0);
      alarmSlider.value(alarm);
    }
  }

  draw_clock(H, M, S, mils, alarm);
  console.log(dateday); // This was added to check if the day was being changed by the slider. It is, however since this slider based setting of it isn't passed to draw_clock and then draw_calendar it doesn't affect the clock itself. (See note at top of this file).
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
