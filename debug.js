var DEBUG=true;

var debugCheckbox;
var hourSlider;
var minSlider;
var secSlider;
var millisSlider;
var daySlider; // Added daySlider variable
var alarmSlider;

function debug_setup() {
  debugCheckbox = createCheckbox('', false);
  debugCheckbox.parent("checkboxDebug")
  hourSlider = createSlider(0, 23, 12);
  hourSlider.parent("sliderHours")
  minSlider = createSlider(0, 59, 0);
  minSlider.parent("sliderMinutes")
  secSlider = createSlider(0, 59, 0);
  secSlider.parent("sliderSeconds")
  millisSlider = createSlider(0, 999, 0);
  millisSlider.parent("sliderMillis")
  daySlider = createSlider(1, 31, 27); // Added daySlider
  daySlider.parent("sliderDay")  // Added daySlider  
  monthSlider = createSlider(0, 11, 8); // Added monthSlider
  monthSlider.parent("sliderMonth")  // Added monthSlider  
  yearSlider = createSlider(2000, 2100, 2085); // Added yearSlider
  yearSlider.parent("sliderYear")  // Added yearSlider
  alarmCheckbox = createCheckbox('', false);
  alarmCheckbox.parent("checkboxAlarm")
  alarmSlider = createSlider(0, 60, 0);
  alarmSlider.parent("sliderAlarm")
}
