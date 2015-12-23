document.addEventListener('DOMContentLoaded', function(){

  var timer = document.getElementById("timer");
  var lapTimer = document.getElementById("currentLap");
  var lapTable = document.getElementById("lapTable");
  var leftButton = document.getElementById("left");
  var rightButton = document.getElementById("right");
  var timerID;
  var startTime;
  var savedTime = 0;
  var lapNumber = 1;
  var lapTimeStart = 0;

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
      // Main Timer
      var timeNow = new Date();
      timeElapsed = timeNow - startTime;
      savedTime = timeElapsed + prevSavedTime;
      var hours = Math.floor((savedTime / 1000 / 60 / 60) % 60);
      var minutes = Math.floor((savedTime / 1000 / 60) % 60);
      var seconds = Math.floor((savedTime / 1000) % 60);
      var hundreths = Math.floor((savedTime / 10) % 100);
      hours = addZeroes(hours);
      minutes = addZeroes(minutes);
      seconds = addZeroes(seconds);
      hundreths = addZeroes(hundreths);
      timer.innerHTML = "<h2>" + minutes + ":" + seconds + ":" + hundreths + "</h2>";


      // Lap Timer
      var lapTime = savedTime - lapTimeStart;
      var lapHours = Math.floor((lapTime / 1000 / 60 / 60) % 60);
      var lapMinutes = Math.floor((lapTime / 1000 / 60) % 60);
      var lapSeconds = Math.floor((lapTime / 1000) % 60);
      var lapHundreths = Math.floor((lapTime / 10) % 100);
      lapHours = addZeroes(lapHours);
      lapMinutes = addZeroes(lapMinutes);
      lapSeconds = addZeroes(lapSeconds);
      lapHundreths = addZeroes(lapHundreths);
      lapTimer.innerHTML = "<p>" + lapMinutes + ":" + lapSeconds + ":" + lapHundreths + "</p>";

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
    if (!timerID) {
      timerID = null;
      startTime = null;
      savedTime = 0;
      lapNumber = 1;
      timer.innerHTML = "<h2>00:00:00</h2>";
      lapTimer.innerHTML = "<p>00:00:00</p>";
      lapTable.innerHTML = "";
    } else {
      var currentLap = savedTime - lapTimeStart;

      var hours = Math.floor((currentLap / 1000 / 60 / 60) % 60);
      var minutes = Math.floor((currentLap / 1000 / 60) % 60);
      var seconds = Math.floor((currentLap / 1000) % 60);
      var hundreths = Math.floor((currentLap / 10) % 100);
      hours = addZeroes(hours);
      minutes = addZeroes(minutes);
      seconds = addZeroes(seconds);
      hundreths = addZeroes(hundreths);



      var newnode = document.createElement("p");
      newnode.innerHTML = "Lap " + lapNumber + " " + minutes + ":" + seconds + ":" + hundreths;
      lapTable.insertBefore(newnode, lapTable.childNodes[0]);
      lapTimeStart = savedTime;
      lapNumber++;
    }

  });


}, false);


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
