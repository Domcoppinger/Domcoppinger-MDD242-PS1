/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
 
// Concept. Have the second minute and hour displayed and then have their size be made relative to their distance from them resetting (i.e. them completing their full cycle through to their individual maximum values).

var millisXpos;
var texty = 250;
var textX = [375, 475, 575, 595];
var shadow;

 
function draw_clock(hour, minute, second, millis, alarm) {
	strokeWeight(2); // Stroke weight to 8 pixels
	stroke(0); // This 
	textSize(40);
	textAlign(CENTER, CENTER);// Aligns the text so it is centered AROUND the position it is placed at, rather than placed starting from it's designated position
	fill(255); // This is used to reset the color so all the numbers aren't colored red
	
	// These were used to set the variables to debug the clock and check how it looked at different times
	//millis = 999;
	//second = 0;
	//minute = 59;
	//hour = 2;

	
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
	text(millis, textX[3] + second / 2, millisXpos); // This sets the position of the millisecond text so that it is always just beside the second value, no matter how small it is.
	
	//console.log(hour);
	//console.log(minute);
	//console.log(second);
	//console.log(millisXpos);
}

function draw_calendar() {
	strokeWeight(0);

var light = hour;	
	
	if (light >= 8 && light <= 21) {
		background(238, 221, 130);
	}	else {
		background(0, 0, 90);
	}
	
var date_day = 31 - day(); // These values take away from the target date (end of month, year, and century) to provide the countdown element to the clock. The day value doesn't account for differences in the lengths of months right now.
var date_month = 12 - month();
var date_year = 2100 - year();
var fill_value;

	fill_value = map(date_year, 0, 100, 0, 245); // This maps the shade of the circle representing this unit on the calendar to how long until that the end of that time unit (E.g. the closer till the end of the month the darker the shade).
	fill(fill_value - 10);	
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
	console.log(light);
}