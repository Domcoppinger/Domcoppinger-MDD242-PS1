/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
 
// Concept. Have the second minute and hour displayed and then have their size be made relative to their distance from them resetting (i.e. them completing their full cycle through to their individual maximum values).

var millisXpos, shadow, alarm_time, alarm_random;
var texty = 250;
var textX = [375, 475, 575, 595];
var alarm_random_option = [0, 1];

// // The below code is used to color the outer 'drop-shadow' ellipse a lighter or darker shade than the inner depending on how light or dark the inner currently is.
function FillValueFun (fill_value, DiffValue) {
		if (fill_value <= DiffValue ) {
		fill(fill_value + DiffValue);	
	} else if (fill_value >= (255 - DiffValue)) {
		fill(fill_value - DiffValue);	
	} else {
		fill(fill_value - DiffValue);	
	}
}

// Background calendar elements function
function draw_calendar(hour, alarm, second, millis, day, month, year) {
	strokeWeight(0);

var BGcol = color(100);
var light = hour;
var DayCol = color(255, 160, 0);
var NightCol = color(0, 0, 80);
var BGtime = map(hour, 0, 23, 0.0, 1);
	
	// This code changes the background color depending on the time of day
	if (light <= 12) {
			BGcol = lerpColor(NightCol, DayCol, BGtime)
	}	else {
			BGcol = lerpColor(DayCol, NightCol, BGtime)
	}
	
	//This code deals with the alarm 'signalling' when it 'goes off'
	if (alarm == 0 && second % 2 == 0) {
		var PrevCol = BGcol
		for (var alarm_count = 0; alarm_count < 10; alarm_count++) {
			BGcol = lerpColor(PrevCol, color(150, 0, 0), millis / 1000);
			background(BGcol);
			}
		}	else {
		background(BGcol);
	}

var date_day = 31 - day; // These values take away from the target date (end of month, year, and century) to provide the countdown (not alarm) element to the clock. The day value doesn't account for differences in the lengths of months right now.
var date_month = 12 - month;
var date_year = 2100 - year;
var fill_value;
var InDiff = 50; // The difference in shade (lighter or darker depending on how light or dark the inner circle) between the inner and outer ellipse that represent the calendar

	fill_value = map(date_year, 0, 100, 0, 245); // This maps the shade of the circle representing this unit on the calendar to how long until that the end of that time unit (E.g. the closer till the end of the month the darker the shade).
	FillValueFun(fill_value, InDiff); // Function to change the shade of the outer circle to be a shade darker than the outer, expect where the outer has hit max darkness, then it will be a shade lighter.
	ellipse(485, 255, 630, 630);
	fill(fill_value);	
	ellipse(480, 250, 630, 630);
	
	fill_value = map(date_month, 1, 12, 0, 245);
	FillValueFun(fill_value, InDiff); // Sahde change function
	ellipse(485, 255, 490, 490);
	fill(fill_value);
	ellipse(480, 250, 490, 490);
	
	if (alarm < 0) {
		alarm_random = random(alarm_random_option); // Code to randomly select which alarm countdown will be next - only if alarm isn't already active
	}
	
	fill_value = map(date_day, 1, 31, 0, 245);
	if (alarm == 0 && second % 2 && alarm_random == 0) { // Cause clock face and background to alternate flashing red after alarm countdown 'shrinks'
		FillValueFun(fill_value, InDiff);
		ellipse(485, 255, 350, 350);
		PrevCol = color(fill_value);
		fill(lerpColor(PrevCol, color(150, 0, 0), millis / 1000));
		ellipse(480, 250, 350, 350);
	}	else if (alarm == 0 && alarm_random == 1) { // Cause alarm face to flash every second after it has grown to during countdown
			elpsize = 2500;
			fill(lerpColor(color(20, 20, 20), color(150, 0, 0), millis / 1000));
			ellipse(485, 255, elpsize, elpsize);			
	}	else if (alarm > 0 && alarm_random == 0) { // Code for alarm countdown random 1 (Clock face shrinking)
			var elpsize = map(alarm, 10, 0, 350, 0);
			FillValueFun(fill_value, InDiff);
			ellipse(485, 255, elpsize, elpsize);
			fill(150, 0, 0);
			ellipse(482.5, 252.5, elpsize, elpsize);
	}	else if (alarm > 0 && alarm_random == 1) { // Code for alarm countdown random 2 (clock face growing to cover screen)
			elpsize = map(alarm, 10, 0, 350, 1150); // Just large enough to cover the whole canvas
			FillValueFun(fill_value, InDiff);
			ellipse(485, 255, elpsize, elpsize);
			fill(150, 0, 0);
			ellipse(482.5, 252.5, elpsize, elpsize);
	}	else { 									// Draw clock face with shade based on day of the month when alarm isn't active
			FillValueFun(fill_value, InDiff);
			ellipse(485, 255, 350, 350);
			fill(fill_value);
			ellipse(480, 250, 350, 350);
	}
	
	//console.log(date_day);
	//console.log(date_month);
	//console.log(date_year);
	//console.log(light);
	//console.log(hour);
	//console.log(BGtime);
	//console.log(BGcol);
	console.log(alarm_random);
	//print(BGcol);
}
 
function draw_clock(hour, minute, second, millis, alarm, day, month, year) { // Changed this to accept variables from the expanded API
	
	// Draws the background elements of the clock that show changes to the date first (so they are beneath the other elements)
	draw_calendar(hour, alarm, second, millis, day, month, year);
	
	strokeWeight(2); // Stroke weight to 2 pixels
	stroke(0); // This 
	textSize(40);
	textAlign(CENTER, CENTER);// Aligns the text so it is centered AROUND the position it is placed at, rather than placed starting from it's designated position
	fill(255); // This is used to reset the color so all the numbers aren't colored red
	
	// These were used to set the variables to quickly debug the clock and check how it looked at different times
	//millis = 999;
	//second = 0;
	//minute = 59;
	//hour = 12;
	
	shadow = map(hour, 0, 23, 1.25, 1.75)
	textSize(map(hour, 0, 23, 0, 59) + 15); //The inclusion of the equation element in this text size is to ensure that the size of the hour text is relative to the other text elements.
	text(hour, textX[0] + shadow, texty + shadow); // Text position drawn from an array
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
	
	// Old Alarm function		
	// Alarm text
	//if (alarm > 0) {
	//	alarmTextSize = (map(5, -10000, 0, 0, 59) + 15); //Maps alarm text size to how close to being done it is
	//	textSize(alarmTextSize);
	//	fill(240,0,0); // Makes alarm text red
	//	var alarm_text = round(alarm);
	//	text(alarm_text, 480, 390);
	//} else if (alarm == 0) {
	//	fill(240,0,0); // Makes alarm text red
	//	textSize(45);
	//	text("Alarm!", 480, 390);
	//}
	
	//print("Alarm time:");
	//console.log(alarm);
	
	//console.log(hour);
	//console.log(minute);
	//console.log(second);
	print("Day:");
	console.log(day);
	print("Month:");
	console.log(month);
	print("Year:");
	console.log(year);
	//console.log(millisXpos);
}