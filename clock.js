/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
 
// Concept. Have the second minute and hour displayed and then have their size be made relative to their distance from them resetting (i.e. them completing their full cycle through to their individual maximum values).

var millisXpos, shadow, alarm_time;
var texty = 250;
var textX = [375, 475, 575, 595];
var alarm_started = false;
var alarm_color = false;

// Alarm function
function alarm_clock(second, alarm_time) {
	var alarm_time_buffer, alarm_time_buffer2, alarmTextSize, alarm_duration;
	
	if (alarm_started = false) { //Checks if the alarm has just been triggered or now
		alarm_started = true;
		alarm_time_buffer2 = millis;
		alarm_duration = 300; // 300 units at 60fps is 5 seconds
	}
	
	if (alarm_time_buffer2 < millis) { // This code is used to measure how much time has passed since the alarm function was last called (a tiny unit of time)
		alarm_time_buffer = millis - alarm_time_buffer2;
	} else {
		alarm_time_buffer = (1000 - alarm_time_buffer2) + millis;
	}
	
	alarm_time = alarm_time - alarm_time_buffer
	
	while (alarm_time == 0 && alarm_duration > 0) { // Causes the clock background to flash red whilst the alarm is 'signalling' it is done
		alarm_color = true;
		alarm_duration = alarm_duration - 1;
	}
		
	if (alarm_duration == 0) { // resets this function after the alarm has finished it's job
		alarm_time = -1;
		alarm_color = false;
		alarm_started = false;
	}
	
	// Alarm text
	alarmTextSize = (map((alarm_time * -1), -10000, 0, 0, 59) + 15);
	textSize(alarmTextSize);
	fill(255,0,0); // Makes alarm text red
	text(alarm_time, 480, 390);
	
	print("Alarm time:");
	console.log(alarm_time);
	
	alarm_time_buffer2 = millis; // resets the alarm_time_buffer2 to the current millis to check how much time has passed next time this function is called
}

// Background calendar elements function
function draw_calendar(hour) {
	strokeWeight(0);

var BGcol = color(100);
var light = hour;
var DayCol = color(255, 160, 0);
var NightCol = color(0, 0, 80);
var BGtime = map(hour, 0, 23, 0.0, 1);
	
	if (light <= 12) {
			BGcol = lerpColor(NightCol, DayCol, BGtime)
	}	else {
			BGcol = lerpColor(DayCol, NightCol, BGtime)
	}
	
	if (alarm_clock = true && second % 2 == 0) {
		BGcol = (255, 0, 0);
	}	else {
		background(BGcol);
	}
	
var date_day = 31 - day(); // These values take away from the target date (end of month, year, and century) to provide the countdown (not alarm) element to the clock. The day value doesn't account for differences in the lengths of months right now.
var date_month = 12 - month();
var date_year = 2100 - year();
var fill_value;

	fill_value = map(date_year, 0, 100, 0, 245); // This maps the shade of the circle representing this unit on the calendar to how long until that the end of that time unit (E.g. the closer till the end of the month the darker the shade).
	fill(fill_value - 40);	
	ellipse(485, 255, 630, 630);
	fill(fill_value);	
	ellipse(480, 250, 630, 630);
	
	fill_value = map(date_month, 1, 12, 0, 245);
	fill(fill_value - 10);	
	ellipse(485, 255, 490, 490);
	fill(fill_value);
	ellipse(480, 250, 490, 490);
	
	fill_value = map(date_day, 1, 31, 0, 245);
	fill(fill_value - 10);	
	ellipse(485, 255, 350, 350);
	fill(fill_value);
	ellipse(480, 250, 350, 350);
	
	//console.log(date_day);
	//console.log(date_month);
	//console.log(date_year);
	//console.log(light);
	//console.log(hour);
	//console.log(BGtime);
	//console.log(BGcol);
	//print(BGcol);
}
 
function draw_clock(hour, minute, second, millis, alarm) {
	
	// Draws the background elements of the clock that show changes to the date first (so they are beneath the other elements)
	draw_calendar(hour);
	
	//alarm condition goes here, triggers the alarm function on mouse press IF it isn't already triggered.
	if (mouseIsPressed && alarm_started == false || alarm == 10000) { // Checks if user starts clock by clicking - also checks if alarm is started already - AND checks if the alarm has been started by the debug page
		alarm_time = 10000;
		alarm_clock(second, alarm_time);
	}
	
	strokeWeight(2); // Stroke weight to 8 pixels
	stroke(0); // This 
	textSize(40);
	textAlign(CENTER, CENTER);// Aligns the text so it is centered AROUND the position it is placed at, rather than placed starting from it's designated position
	fill(255); // This is used to reset the color so all the numbers aren't colored red
	
	// These were used to set the variables to debug the clock and check how it looked at different times
	//millis = 999;
	//second = 0;
	//minute = 59;
	//hour = 12;
	
	shadow = map(hour, 0, 23, 1.25, 1.75)
	textSize(map(hour, 0, 23, 0, 59) + 15); //The inclusion of the equation element in this text size is to ensure that the size of the hour text is relative to the other text elements.
	text(hour, textX[0] + shadow, texty + shadow);
	text(hour, textX[0], texty);
	
	shadow = map(minute, 0, 59, 1.25, 1.75)		
	textSize(minute + 15);
	fill(200);
	text(minute, textX[1] + shadow, texty + shadow);
	fill(255);
	text(minute, textX[1], texty);
	
	shadow = map(second, 0, 59, 1.25, 1.75)
	textSize(second + 15);
	fill(200);
	text(second, textX[2] + shadow, texty + shadow);
	fill(255);
	text(second, textX[2], 250);
	
	if (millis == 0) { // This is required because when millis == 0 we cannot divide it's text size so it keeps its last text size. This leads to a 'juttering' due to the large size of the single digit integer.
		textSize(1);
		}	else {
				textSize(millis / 100);
		}
	
	millisXpos = map(second, 0, 60, 255, 275); // Part of the system to set the millis position relative to the size of the seconds text	
	strokeWeight(0); // This removes the border around the millis text due to it's small size
	
	fill(100);
	text(millis, textX[3] + 0.5 + second / 2, millisXpos + 0.5); // This sets the position of the millisecond text so that it is always just beside the second value, no matter how small it is.

	fill('red'); //This is used to set the milli seconds text to red
	text(millis, textX[3] + second / 2, millisXpos);
	
	//console.log(hour);
	//console.log(minute);
	//console.log(second);
	//console.log(millisXpos);
	console.log(alarm);	
}