/*
var slider1 = document.getElementById("breakDistanceSlider");
var output1 = document.getElementById("bdval");
output1.innerHTML = slider1.value;


var slider2 = document.getElementById("studyLengthSlider");
var output2 = document.getElementById("slval");
output2.innerHTML = slider2.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
}

slider2.oninput = function() {
  output2.innerHTML = this.value;
}
 */

var thisTime;
var currentStars = 0;

function starChange(starVal) {
  currentStars = starVal;
  for (j = 1; j < 6; j++) {
    if (j <= starVal) {
      document.getElementById("star" + j).innerHTML = "★";
    } else {
      document.getElementById("star" + j).innerHTML = "☆";
    }
  }
}






function clockChange() {
  if (document.getElementById("clock").style.display == "none") {
    document.getElementById("clock").style.display = "block";
  } else {
    document.getElementById("clock").style.display = "none";
  }
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("clock").innerHTML =
    hours + ":" + minutes + ":" + seconds;
}




setInterval(updateClock, 100);


function viewGraphs() {
  document.getElementById("graphs-container").style.display = "block";
  document.getElementById("mainButtons").style.display = "none";
  document.getElementById("display").style.display = "none";
}

function viewButtons() {
  document.getElementById("graphs-container").style.display = "none";
  document.getElementById("mainButtons").style.display = "block";
  document.getElementById("display").style.display = "block";
}


function changeToBreakUi() {
  clearInterval(breakCountdownText)
  document.getElementById("endSessionButton").style.display = "none";
  document.getElementById("shortBreak").style.display = "none";
  document.getElementById("longBreak").style.display = "none";
  document.getElementById("text").innerHTML = "Touch some grass!";
  document.getElementById("endBreakButton").style.display = "block";
}

function changeToWorkUi() {
  document.getElementById("startSessionButton").style.display = "none";
  document.getElementById("studyLengthInput").style.display = "none";
  document.getElementById("breakIntervalInput").style.display = "none";

  document.getElementById("endBreakButton").style.display = "none";

  document.getElementById("endSessionButton").style.display = "block";
  document.getElementById("shortBreak").style.display = "block";
  document.getElementById("longBreak").style.display = "block";
    

  document.getElementById("text").innerHTML =
      "You should take a break in " + breakCountdown + " minutes :)";
  breakCountdownText = setInterval(() => {
    document.getElementById("text").innerHTML =
      "You should take a break in " + breakCountdown + " minutes :)";
  }, 60000);
}
function changeToRatingUi() {
  clearInterval(breakCountdownText)
  document.getElementById("star1").style.display = "inline-block";
  document.getElementById("star2").style.display = "inline-block";
  document.getElementById("star3").style.display = "inline-block";
  document.getElementById("star4").style.display = "inline-block";
  document.getElementById("star5").style.display = "inline-block";
  document.getElementById("submitRating").style.display = "block";

  document.getElementById("endSessionButton").style.display = "none";
  document.getElementById("shortBreak").style.display = "none";
  document.getElementById("longBreak").style.display = "none";
  document.getElementById("text").innerHTML =
    "please rate your study session :)";
}
