document.addEventListener('DOMContentLoaded', function(){

  var timer = document.getElementById("timer");
  var leftButton = document.getElementById("left");
  var rightButton = document.getElementById("right");
  var timerID;
  var startTime;
  var savedTime = 0;

  // Add prefix "0" if less than 10
  var addZeroes = function(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }

  // Update Time Function
  var updateTime = function (prevSavedTime) {
    timerID = setInterval(function() {
      var timeNow = new Date();
      timeElapsed = timeNow - startTime;
      savedTime = timeElapsed + prevSavedTime;
      hours = Math.floor((savedTime / 1000 / 60 / 60) % 60);
      minutes = Math.floor((savedTime / 1000 / 60) % 60);
      seconds = Math.floor((savedTime / 1000) % 60);
      tenths = Math.floor((savedTime / 10) % 100);
      hours = addZeroes(hours);
      minutes = addZeroes(minutes);
      seconds = addZeroes(seconds);
      tenths = addZeroes(tenths);
      timer.innerHTML = "<h2>" + minutes + ":" + seconds + ":" + tenths + "</h2>";
    }, 10);
  }

  var switchText = function(DOMelement, text) {
    DOMelement.innerHTML = text;
  }

  // Start Button Event
  rightButton.addEventListener("click", function(){
    if (!timerID && !startTime) {
      startTime = Date.now();
      updateTime(savedTime);
      switchText(rightButton, "Stop");
      switchText(leftButton, "Lap");
    } else if (timerID && startTime) {
      clearInterval(timerID);
      timerID = null;
      startTime = null;
      switchText(rightButton, "Start");
      switchText(leftButton, "Reset");
    }
  });

  leftButton.addEventListener("click", function(){
    timerID = null;
    startTime = null;
    savedTime = 0;
    timer.innerHTML = "<h2>00:00:00</h2>";
  });


}, false);



// Timer tracks minutes, seconds, hundreds.
// Switches to hour, minutes, second after 60 min.
// Start button
  // Switches to Stop button when selected
  // Switches back to start when selected
// Reset button
  // Switches to Lap button when timer starts
  // Lap button - when clicked documents the lap time
  // Switches back to Reset when timer stops

// UI
  // Timer
  // Lap Timer (above timer & smaller)
  // Laps are documented & tracked. Latest lap is at the top.
