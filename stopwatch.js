document.addEventListener('DOMContentLoaded', function(){
  var timer = document.getElementById("timer");
  var lapTimer = document.getElementById("lapTimer");
  var lapTable = document.getElementById("lapTable");
  var rightButton = document.getElementById("right");
  var leftButton = document.getElementById("left");
  var timerID, totalTime = 0, lapTimeStart = 0, lapNumber = 1;

  // Add prefix "0" if needed
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
      var html = minutes + ":" + seconds + "." + hundreths;
    }
    return html;
  }

  var updateTime = function (prevSavedTime) {
    timerID = setInterval(function() {
      // Main Timer
      totalTime = (new Date() - startTime) + prevSavedTime;
      timer.innerHTML = "<h2>" + formatTime(totalTime) + "</h2>";

      // Lap Timer
      var lapTime = totalTime - lapTimeStart;
      lapTimer.innerHTML = "<p>" + formatTime(lapTime) + "</p>";
    }, 10);
  }

  var startTimer = function() {
    startTime = Date.now();
    updateTime(totalTime);
    leftButton.innerHTML = "Stop";
    leftButton.setAttribute("class", "stop");
    rightButton.innerHTML =  "Lap";
  }

  var stopTimer = function() {
    clearInterval(timerID);
    timerID = null;
    startTime = null;
    leftButton.innerHTML = "Start";
    leftButton.setAttribute("class", "start");
    rightButton.innerHTML =  "Reset";
  }

  var resetTimer = function() {
    totalTime = 0;
    lapNumber = 1;
    lapTimeStart = 0;
    timer.innerHTML = "<h2>00:00.00</h2>";
    lapTimer.innerHTML = "<p>00:00.00</p>";
    lapTable.innerHTML = "";
  }

  var saveLap = function() {
    var savedLap = totalTime - lapTimeStart;
    var newLapDisplay = document.createElement("p");
    newLapDisplay.innerHTML = "<span class='lapNumber'>Lap " + lapNumber + " </span>" + formatTime(savedLap);
    lapTable.insertBefore(newLapDisplay, lapTable.childNodes[0]);
    lapTimeStart = totalTime;
    lapNumber++;
  }

  // Event Listeners
  leftButton.addEventListener("click", function(){
    if (!timerID) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  rightButton.addEventListener("click", function(){
    if (!timerID) {
      resetTimer();
    } else {
      saveLap();
    }
  });
}, false);
