  
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

function menuChange1() {
  document.getElementById("start").style.display = "none";
  document.getElementById("studyLength").style.display = "none";
  document.getElementById("breakDistance").style.display = "none";
  document.getElementById("stop").style.display = "block";
  document.getElementById("shortBreak").style.display = "block";
  document.getElementById("longBreak").style.display = "block";
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
  
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;
  }
  
  setInterval(updateClock, 1000);


