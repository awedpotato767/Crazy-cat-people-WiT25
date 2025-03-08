var breakDistance = parseInt(document.getElementById("breakDistance").innerHTML);

console.log(studyLength, breakLength);

var breakStart = null;

var isBreak = false;

var overtimeActivated = false;

function startStudy() {
    setTimeout(function() {
        alert("Time to take a break!");
        isBreak = true;
        breakStart = Date.now();
        startBreak();
    }, breakDistance * 60 * 1000);
}

function endBreak() {
    isBreak = false;
}

document.addEventListener('mousemove', function() {
    var overtime = parseInt(Date.now() - breakStart);
    //if the user hasn't properly ended the break and they are still doing stuff
    if (overtime >= 10000 && isBreak) {
        overtimeActivated = true;
        alert("Perhaps you need another reminder?");
    }
    if (overtime >= 20000 && isBreak && overtimeActivated) {
        alert("Please take care of yourself.");
    }
});