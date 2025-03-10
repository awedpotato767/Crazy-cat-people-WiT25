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

function starChange(starVal) {
  for (j = 1; j < 6; j++) {
    if (j <= starVal) {
      document.getElementById("star" + j).innerHTML = "★";
    } else {
      document.getElementById("star" + j).innerHTML = "☆";
    }
  }
}

function menuChange1() {
  document.getElementById("start").style.display = "none";
  document.getElementById("studyLength").style.display = "none";
  document.getElementById("breakDistance").style.display = "none";
  document.getElementById("stop").style.display = "block";
  document.getElementById("shortBreak").style.display = "block";
  document.getElementById("longBreak").style.display = "block";
  document.getElementById("endBreak").style.display = "none";

  thisTime = parseInt(document.getElementById("breakDistanceSlider").value);
  document.getElementById("text").innerHTML =
    "You should take a break in " + thisTime + " minutes :)";
  timer = setInterval(breakTimer(), 60000);
}

function aBreak() {
  document.getElementById("stop").style.display = "none";
  document.getElementById("shortBreak").style.display = "none";
  document.getElementById("longBreak").style.display = "none";
  document.getElementById("text").innerHTML = "Touch some grass!";
  document.getElementById("endBreak").style.display = "block";
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

function stopChange() {
  document.getElementById("star1").style.display = "inline-block";
  document.getElementById("star2").style.display = "inline-block";
  document.getElementById("star3").style.display = "inline-block";
  document.getElementById("star4").style.display = "inline-block";
  document.getElementById("star5").style.display = "inline-block";
  document.getElementById("stop").style.display = "none";
  document.getElementById("shortBreak").style.display = "none";
  document.getElementById("longBreak").style.display = "none";
  document.getElementById("text").innerHTML =
    "please rate your study session :)";

  clearInterval(timer);
}

setInterval(updateClock, 100);

function breakTimer() {
  document.getElementById("text").innerHTML =
    "You should take a break in " + thisTime + " minutes :)";
  thisTime--;
}

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

const graphs = Vue.createApp({
  data() {
    return {};
  },
  methods: {
    getGraphData: function () {
      axios.post("/generategraphs");
    },
  },
  mounted() {
    this.getGraphData();
  },
});

graphs.mount("#graphs-container");
