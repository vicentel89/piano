$(function() {
  //Don't write code above this.


  //There is a problem because the audio files have a mute time before they sound and that time differs between the files, so the values in these object refers to that mute time that will be removes later.
  const whiteKeyNotes = {
    keyC3: 0.6,
    keyD3: 0.56,
    keyE3: 0.8,
    keyF3: 0.96,
    keyG3: 0.52,
    keyA3: 0.8,
    keyB3: 0.64,
    keyC4: 0.6,
    keyD4: 0.76,
    keyE4: 0.72
  };
  const blackKeyNotes = {
    keyDb3: 0.68,
    keyEb3: 0.36,
    keyGb3: 0.4,
    keyAb3: 0.84,
    keyBb3: 0.28,
    keyDb4: 0.6,
    keyEb4: 0.64
  };

  (addSoundToKeys())(whiteKeyNotes);
  (addSoundToKeys())(blackKeyNotes);

  function addSoundToKeys() {
    const keysAudio = {};
    return function(notesGroup) {
      $.each(notesGroup, function(key, val) {

        keysAudio[key] = new Audio("src/sounds/" + key + ".mp3"); //create an audio for each piano key

        //Add sounds to the piano keys
        if (typeof window.orientation !== 'undefined') { //check if it is a mobile
          addSoundWhenEvent("touchstart", "touchend");
        } else { //else, if it is a desktop
          addSoundWhenEvent("mousedown", "mouseup");
        }

        function addSoundWhenEvent(inEvent, outEvent) {
          $("#" + key).on(inEvent, function() { //add sound to a key when event
            keysAudio[key].volume = 1;
            keysAudio[key].currentTime = val;
            keysAudio[key].play();
          });

          $("#" + key).on(outEvent, function() { //remove sound with a fade out animation when event ends
            var id = setInterval(lowerVolume, 5);

            function lowerVolume() {
              if (keysAudio[key].volume <= 0.01) {
                clearInterval(id);
              } else {
                keysAudio[key].volume -= 0.01
              }
            }
          });
        }
      });
    }
  }


  //////////////////Hide the overlay and enter in fullscreen mode
  var elem = document.getElementById("main-container");

  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  $("#button").click(function() {
    $("#button").addClass("tada")
    $(".overlay").delay(1000).fadeOut(2000);
    openFullscreen();
  });

  //Don't write code below this.
});