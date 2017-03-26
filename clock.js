/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
 
// REMINDER - Canvas is 960 * 500 
 
// CONCEPT - Recreate Meada's 8th clock. This is a clock design that displays only hours and minutes. These values alternate between each being big and then small and for my version this occurs over the course of exactly 1 second as another, non written, method of showing the passage of seconds. The text also isn't pixelated like Maeda's was, this gives the clock a revitalised and more modern feel.
 
var hoursize = 1;
var minsize = 1;
var initialcheck = 0; // Used to disable the code that sets the initial size of the text
 
function draw_clock(hour, minute, second, millis, alarm) {
	background(0); // Black background
	textAlign(CENTER, CENTER); // Aligns the text to the center (vertically). Important to center text around it's 'draw' point rather than starting from it's 'draw' point.
	
	
	// This code simply checks, on load and only once, if the second time is even or odd. It then sets the text sizes appropriately.
	if (initialcheck == 0) {
		if ((second % 2) == 0) { // 'True' this is an even number
			hoursize = 280;
			minsize = 100;
			initialcheck = 1;
		} else {
			hoursize = 100;
			minsize = 280;
			initialcheck = 1;
			}
	}
	
	// Below we continually check if the seconds value is currently even or odd. This is used to determine if the hour or the minute should be growing and vice versa
	if ((second % 2) == 0) { // 'True' this is an even number
			if (hoursize < 280) {		// Ensures the text isn't at it's maximum size
				hoursize = hoursize + 3; // Increase the hour text size by 3. This increment of 3 is used for all size changes and is based on the canvas FPS of 60 to ensure text goes through the full range of sizes, from 100 to 280
			}
			if (minsize > 100) { 		// Ensures the text isn't at it's minimum size
				minsize = minsize - 3; // Decrease the min text size
			}
	}	else { // This is the exact opposite of the above code snippet for one the seconds value is odd
			if (hoursize > 100) {
				hoursize = hoursize - 3;
			}
			if (minsize < 280) {
				minsize = minsize + 3;
			}
	}
	
	
	fill(hoursize - 25); // This uses the text size to also change the shade of the text. The '-25' ensures this change both maximises the color change range whilst also staying within the maximum limit for shades (a value of 255).
	textSize(hoursize);
	text(hour, 330, 250);
	
	fill(minsize - 25);
	textSize(minsize);
	text(minute, 630, 250);
	
	// The below snippet was used to visually compare the seconds counting to ensure the animation properly conveyed the passage of seconds.
	//fill(255, 0, 0);
	//textSize(50);
	//text(second, 480, 450);
	
	// The next two lines were used to debug values
	//console.log(hoursize);
	//console.log(minsize);
}