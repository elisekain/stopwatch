document.addEventListener('DOMContentLoaded', function(){

  var timer = document.getElementById("timer");
  var rightButton = document.getElementById("right");
  var leftButton = document.getElementById("left");
  var timerID = null;
  var start;

  // Add prefix "0" if less than 10
  var addZeroes = function(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }

  // Update Time Function
  var updateTime = function () {
    timerID = setInterval(function() {
      var time = new Date();
      timeElapsed = time - start;
      hours = Math.floor((timeElapsed / 1000 / 60 / 60) % 60);
      minutes = Math.floor((timeElapsed / 1000 / 60) % 60);
      seconds = Math.floor((timeElapsed / 1000) % 60);
      tenths = Math.floor((timeElapsed / 10) % 100);
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
