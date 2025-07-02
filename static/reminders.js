var studyLength = document.getElementById("studyLengthSlider").value;
var breakInterval = document.getElementById("breakIntervalSlider").value;

var isBreak = false;

//create a countdown clock. assume this value is nonsense until the value is initialised.
var breakCountdown = breakInterval;
setInterval(() => {
  breakCountdown --;
}, 60000);
//declaring this here to make it global.
var breakCountdownText;
var breakReminderTimeout;
var workReminderTimeout;
//create a countdown variable for the study session
var endReminderTimeout;
var reminderInterval;


function startStudy() {
  axios.post("/newlog", JSON.stringify("session started"));
  studyLength = document.getElementById("studyLengthSlider").value;
  breakInterval = document.getElementById("breakIntervalSlider").value;
  isBreak = false;


  //initialise the countdown clock for breaks
  breakCountdown = breakInterval;
  breakReminderTimeout = setTimeout(showBreakReminders, 60000*breakCountdown);

  //initialise the countdown clock for stopping
  endReminderTimeout = setTimeout(showEndReminder, 60000*studyLength);
  changeToWorkUi();

}

function startShortBreak(){
  startBreak(5);
  axios.post("/addlog", JSON.stringify("short_break started"));
}
function startLongBreak(){
  startBreak(15);
  axios.post("/addlog", JSON.stringify("long_break started"));
}
function endBreak() {
  isBreak = false;
  clearTimeout(workReminderTimeout);
  clearInterval(reminderInterval);
  axios.post("/addlog", JSON.stringify("break ended"));
  changeToWorkUi();
}

function endStudySession(){
  clearTimeout(endReminderTimeout);
  clearInterval(reminderInterval);
  axios.post("/addlog", JSON.stringify("session ended"));
  changeToRatingUi();
}

async function submitRating() {
  promise = axios.post(
    "/addlog",
    JSON.stringify("session_rating " + currentStars),
  );
  promise.then(async function (response) {
    await axios.post("/generategraphs");
    location.reload();
  });
  return false;
}


function startBreak(minutes) {
  isBreak = true;
  //remind the user to take a break when that is due
  clearTimeout(breakReminderTimeout);
  clearInterval(reminderInterval);
    //set up a countdown until the next break
  breakCountdown = breakInterval;  //remind the user to get back to work after a delay
  breakReminderTimeout = setTimeout(showBreakReminders, 60000*breakCountdown);
  workReminderTimeout = setTimeout(showWorkReminders,60000*minutes);
  changeToBreakUi();
}

function showWorkReminders() {
  reminderInterval = setInterval(() => {
    axios.get("/workreminder", {responsetype:'text'})
    .then(function (response){
      document.getElementById("text").innerHTML = response.data;
    })
  }, 30000);
}

function  showBreakReminders() {
  reminderInterval = setInterval(() => {
    axios.get("/breakreminder", {responsetype:'text'})
    .then(function (response){
      document.getElementById("text").innerHTML = response.data;
    })
  }, 30000);
}

function showEndReminder(){
  reminderInterval = setInterval(() => {
    axios.get("/endreminder", {responsetype:'text'})
    .then(function (response){
      document.getElementById("text").innerHTML = response.data;
    })
  }, 30000);
}

//OBSELETE

/*
var tiempo = 0;
var breakDistance;
var studyLength;
const study = Vue.createApp({
  data() {
    return {
      breakDistance: 30,
      studyLength: 60,
      breakStart: null,
      isBreak: false,
      breakType: null,
      overtimeActivated: false,
    };
  },
  methods: {
    endBreak: function () {
      this.isBreak = false;
      this.breakStart = null;
      clearInterval(thisInterval);
    },
    endStudySession: function () {
      axios.post("/addlog", JSON.stringify("session ended"));
    },
    startShortBreak: function () {
      axios.post("/addlog", JSON.stringify("short_break started"));
      this.isBreak = true;
      this.breakType = "short";
      this.breakStart = Date.now();
    },
    startLongBreak: function () {
      axios.post("/addlog", JSON.stringify("long_break started"));
      this.isBreak = true;
      this.breakType = "long";
      this.breakStart = Date.now();
    },
    breakTimer: function (tiempo) {
      document.getElementById("text").innerHTML =
        "You should take a break in " + tiempo + " minutes :)";
      tiempo--;
    },
    startStudy: function () {
      console.log("let the study commence");
      axios.post("/newlog", json.stringify("session started"));
      var self = this;
      setTimeout(
        function () {
          alert("Time to take a break!");
          self.isBreak = true;
          self.breakStart = Date.now();
          self.startBreak();
        },
        this.breakDistance * 60 * 1000,
      );
      tiempo = parseInt(document.getElementById("breakDistanceSlider").value);
      document.getElementById("text").innerHTML =
        "You should take a break in " + tiempo + " minutes :)";
      thisInterval = setInterval(breakTimer, 60000);
    },
  },

  mounted() {
    breakDistance = parseInt(
      document.getElementById("breakDistanceSlider").value,
    );
    studyLength = parseInt(document.getElementById("studyLengthSlider").value);

    document.addEventListener("mousemove", function () {
      if (this.isBreak) {
        var overtime = parseInt(Date.now() - breakStart);
        //if the user hasn't properly ended the break and they are still doing stuff
        if (overtime >= 10000 && this.isBreak) {
          this.overtimeActivated = true;
          alert("Perhaps you need another reminder?");
        }
        if (overtime >= 20000 && this.isBreak && this.overtimeActivated) {
          alert("Please take care of yourself.");
        }
      }
    });
  },
});

study.mount("#mainButtons");

*/
