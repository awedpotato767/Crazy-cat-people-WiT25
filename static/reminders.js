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
      axios.post("/addlog", JSON.stringify("short break started"));
      this.isBreak = true;
      this.breakType = "short";
      this.breakStart = Date.now();
    },
    startLongBreak: function () {
      axios.post("/addlog", JSON.stringify("long break started"));
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
      axios.post("/newlog", JSON.stringify("session started"));
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
