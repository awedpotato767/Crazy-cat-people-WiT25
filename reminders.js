const study = Vue.createApp({
    data() {
        return {
            breakDistance: 30,
            studyLength: 60,
            breakStart: null,
            isBreak: false,
            overtimeActivated: false
        }
    },
    methods: {
        endBreak: function() {
            this.isBreak = false;
            this.breakStart = null;
        },
        endStudySession: function() {
            
        },
        startBreak() {
            this.isBreak = true;
            this.breakStart = Date.now();
        },
        startStudy: function() {
            var self = this;
            setTimeout(function() {
                alert("Time to take a break!");
                self.isBreak = true;
                self.breakStart = Date.now();
                self.startBreak();
            }, this.breakDistance * 60 * 1000);
        },
        mounted() {
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

study.mount('#mainButtons');



