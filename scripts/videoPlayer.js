function intializeVideoPlayerControls() {
    //g: for each button, add functionality 
    var video = document.getElementById("videoplayer");

    function playVideo(event) {

        button = event.target;

        if (video.paused) {
            video.play();
            button.textContent = "Pause";
        } else {
            video.pause();
            button.textContent = "Play";
        }
    }

    function seekVideo(numOfSeconds) {
        try {
            if (numOfSeconds === 0) {
                video.curremtTime = numOfSeconds;
            } else {
                video.curremtTime += numOfSeconds;
            }

        } catch (err) {
            displayError("Could not seek.")
        }
    }

    document.getElementById("playButton").addEventListener("click", playVideo, false);
    document.getElementById("backButton").addEventListener("click", function() { seek(-5); }, false);
    document.getElementById("forwardButton").addEventListener("click", function() {
        seek(5);
    }, false);

    document.getElementById("slowerButton").addEventListener("click", function() {
        video.playbackRate -= .25;
    }, false);
    document.getElementById("fasterButton").addEventListener("click", function() {
        video.playbackRate += .25;
    }, false);
    document.getElementById("muteButton").addEventListener("click", function(s) {
        if (video.muted) {
            video.muted = false;
        } else {
            video.muted = true;
        }
    }, false);

    video.addEventListener("error", function(err) {
        errMessage(err);
    }, true);

    function displayError(error) {
        document.getElementById("errorDiv").textContent = error;
    }
}
