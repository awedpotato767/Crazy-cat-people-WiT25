const study = Vue.createApp({
    data() {
        return {
            breakDistance: null,
            studyLength: null,
            breakStart: null,
            isBreak: false,
            overtimeActivated: false
        }
    },
    methods: {
        startStudy: function() {
            setTimeout(function() {
                alert("Time to take a break!");
                isBreak = true;
                breakStart = Date.now();
                startBreak();
            }, breakDistance * 60 * 1000);
        },
        endBreak: function() {
            this.isBreak = false;
            this.breakStart = null;
        },
        endStudySession: function() {
            axios.post()
        },
        mounted() {
            breakDistance = parseInt(document.getElementById("breakDistanceSlider").value);
            studyLength = parseInt(document.getElementById("studyLengthSlider").value);
            document.addEventListener('mousemove', function() {
                if (isBreak) {
                    var overtime = parseInt(Date.now() - breakStart);
                    //if the user hasn't properly ended the break and they are still doing stuff
                    if (overtime >= 10000 && isBreak) {
                        overtimeActivated = true;
                        alert("Perhaps you need another reminder?");
                    }
                    if (overtime >= 20000 && isBreak && overtimeActivated) {
                        alert("Please take care of yourself.");
                    }
                }
            });
        }
    }
});

study.mount('#backBox');

