/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
 
// Concept. Have the second minute and hour displayed and then have their size be made relative to their distance from them resetting (i.e. them completing their full cycle through to their individual maximum values).
 
function draw_clock(hour, minute, second, millis, alarm) {
	background(0); // Black background
	strokeWeight(2); // Stroke weight to 8 pixels
	textSize(40);

	textAlign(CENTER);// Aligns the text to the center (vertically)
	fill(255); // This is used to reset the color so all the numbers aren't colored red
	
	textSize(hour * 2 + 15); //The inclusion of the equation element in this text size is to ensure that the size of the hour text is relative to the other text elements.
	text(hour, 350, 250);
	
	textSize(minute + 15);	
	fill(200);
	text(minute, 451.5, 251.5);
	fill(255);
	text(minute, 450, 250);
	
	textSize(second + 15);
	fill(200);
	text(second, 551.5, 251.5);
	fill(255);
	text(second, 550, 250);
	
	// scale(1.5); - This was based around the idea that a 'cheat' way of creating the text pixelation would be to decrease the text size and then scale the text upwards causing pixelation.
	if (millis == 0) { // This is required because when millis == 0 we cannot divide it's text size so it keeps its last text size. This leads to a 'juttering' due to the large size of the single digit integer.
		textSize(1);
		}	else {
				textSize(millis / 100);
		}
	fill(100);
	text(millis, 570.5 + second / 2, 250.5); //This sets the position of the millisecond text so that it is always just beside the second value, no matter how small it is.
		
	fill('red'); //This is used to set the milli seconds text to red
	text(millis, 570 + second / 2, 250); //This sets the position of the millisecond text so that it is always just beside the second value, no matter how small it is.
	
	console.log(hour);
	console.log(minute);
	console.log(second);
}