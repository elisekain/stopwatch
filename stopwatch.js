document.addEventListener('DOMContentLoaded', function(){

  var timer = document.getElementById("timer");
  var lapTimer = document.getElementById("lapTimer");
  var lapTable = document.getElementById("lapTable");
  var leftButton = document.getElementById("left");
  var rightButton = document.getElementById("right");
  var timerID;
  var savedTime = 0;
  var lapTimeStart = 0;
  var lapNumber = 1;

  // Add prefix "0" if less than 10
  var addZeroes = function(value) {
    if (value < 10) {
      value = "0" + value;
    }
    return value;
  }

  var formatTime = function(inputTime) {
    var hours = Math.floor((inputTime / 1000 / 60 / 60) % 60);
    var minutes = Math.floor((inputTime / 1000 / 60) % 60);
    var seconds = Math.floor((inputTime / 1000) % 60);
    var hundreths = Math.floor((inputTime / 10) % 100);

    hours = addZeroes(hours);
    minutes = addZeroes(minutes);
    seconds = addZeroes(seconds);
    hundreths = addZeroes(hundreths);

    if (hours > 1) {
      var html = hours + ":" + minutes + ":" + seconds;
    } else {
      var html = minutes + ":" + seconds + ":" + hundreths;
    }
    return html;
  }

  // Update Time Function
  var updateTime = function (prevSavedTime) {
    timerID = setInterval(function() {
      // Main Timer
      savedTime = (new Date() - startTime) + prevSavedTime;
      timer.innerHTML = "<h2>" + formatTime(savedTime) + "</h2>";

      // Lap Timer
      var lapTime = savedTime - lapTimeStart;
      lapTimer.innerHTML = "<p>" + formatTime(lapTime) + "</p>";
    }, 10);
  }

  var switchText = function(DOMelement, text) {
    DOMelement.innerHTML = text;
  }

  var startTimer = function() {
    startTime = Date.now();
    updateTime(savedTime);
    switchText(rightButton, "Stop");
    switchText(leftButton, "Lap");
  }

  var stopTimer = function() {
    clearInterval(timerID);
    timerID = null;
    startTime = null;
    switchText(rightButton, "Start");
    switchText(leftButton, "Reset");
  }

  var resetTimer = function() {
    savedTime = 0;
    lapNumber = 1;
    lapTimeStart = 0;
    timer.innerHTML = "<h2>00:00:00</h2>";
    lapTimer.innerHTML = "<p>00:00:00</p>";
    lapTable.innerHTML = "";
  }

  var saveLap = function() {
    var saveLap = savedTime - lapTimeStart;
    var newLapDisplay = document.createElement("p");
    newLapDisplay.innerHTML = "Lap " + lapNumber + " " + formatTime(saveLap);
    lapTable.insertBefore(newLapDisplay, lapTable.childNodes[0]);
    lapTimeStart = savedTime;
    lapNumber++;
  }

  // Event Listeners
  rightButton.addEventListener("click", function(){
    if (!timerID) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  leftButton.addEventListener("click", function(){
    if (!timerID) {
      resetTimer();
    } else {
      saveLap();
    }
  });
}, false);
