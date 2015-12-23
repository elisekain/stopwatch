document.addEventListener('DOMContentLoaded', function(){

  var timer = document.getElementById("timer");
  var rightButton = document.getElementById("right");
  var leftButton = document.getElementById("left");
  var timerID = null;
  var start;

  // Add prefix "0" if less than 10
  var addZero = function(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  // Update Time Function
  var updateTime = function () {
    timerID = setInterval(function() {
      var time = new Date();
      timeElapsed = Math.floor((time - start) / 10);
      console.log(timeElapsed.type);
      var minutes = addZero();
      var seconds = addZero();
      var tenths = addZero();
      timer.innerHTML = "<h2>" + timeElapsed + "</h2>";
    }, 10);
  }

  var switchText = function(DOMelement, text) {
    DOMelement.innerHTML = text;
  }

  // Start Button Event
  rightButton.addEventListener("click", function(){
    if (!timerID) {
      start = Date.now();
      updateTime();
      switchText(rightButton, "Stop");
    } else if (timerID) {
      clearInterval(timerID);
      timerID = null;
      switchText(rightButton, "Start");
    }
  });

  leftButton.addEventListener("click", function(){
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
