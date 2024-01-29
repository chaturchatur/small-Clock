var timerInterval;
var isTimerRunning = false;
var isPaused = false;
var debounceTimeout;

function playSound(){
  const audio = document.getElementById("timerSound");
  audio.play();
}


function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  document.getElementById("open-fl-bt").setAttribute("hidden", "hidden");
  document.getElementById("close-fl-bt").removeAttribute("hidden");
}

function closeFullscreen() {
  var elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById("close-fl-bt").setAttribute("hidden","hidden");
  document.getElementById("open-fl-bt").removeAttribute("hidden");
}

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function timer() {
    if (isTimerRunning) {
        return; // If running, don't start another timer
    }

    var hours = parseInt(document.getElementById("hours").value) || 0;
    var minutes = parseInt(document.getElementById("minutes").value) || 0;
    var seconds = parseInt(document.getElementById("seconds").value) || 0;

    // Validate input values
    hours = Math.max(0, Math.min(23, hours)); 
    minutes = Math.max(0, Math.min(59, minutes)); 
    seconds = Math.max(0, Math.min(59, seconds));

    timerInterval = setInterval(function() {
        if (seconds <= 0) {
            if (minutes <= 0) {
                if (hours <= 0) {
                    clearInterval(timerInterval);
                    reset();
                    // playSound();
                    document.title = "Time's Up!";
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }


        document.getElementById("hours").value = (hours < 10 ? "0" : "") + hours;
        document.getElementById("minutes").value = (minutes < 10 ? "0" : "") + minutes;
        document.getElementById("seconds").value = (seconds < 10 ? "0" : "") + seconds;
        
        document.getElementById("timerRange").value = (hours * 60) + minutes;
        
        document.title = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds); 
    }, 1000);

    isTimerRunning = true;
    document.getElementById("timerRange").setAttribute("hidden","hidden");
    if (isPaused || isTimerRunning) {
        document.getElementById("Reset-bt").removeAttribute("hidden");
    }
    document.getElementById("Start-bt").setAttribute("hidden", "hidden");
    document.getElementById("Pause-bt").removeAttribute("hidden");
}

function pause(){
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = true;
    document.getElementById("Pause-bt").setAttribute("hidden", "hidden");
    document.getElementById("Start-bt").removeAttribute("hidden");
    document.getElementById("Reset-bt").removeAttribute("hidden");
}

function reset(){
    clearInterval(timerInterval);
    document.title = "Small Clock"
    document.getElementById("hours").value = "00";
    document.getElementById("minutes").value = "00";
    document.getElementById("seconds").value = "00";
    document.getElementById("timerRange").value = 0;
    isTimerRunning = false;
    isPaused = false;
    document.getElementById("Start-bt").removeAttribute("hidden");
    document.getElementById("Pause-bt").setAttribute("hidden", "hidden");
    document.getElementById("Reset-bt").setAttribute("hidden", "hidden");
    document.getElementById("timerRange").removeAttribute("hidden");
}

function handleInput(element, validationFunction) {
  clearTimeout(debounceTimeout); // Clear previous timeout
  debounceTimeout = setTimeout(function() {
      validationFunction(element);
  }, 1500); 
}

function validateHours(element) {
  var hours = parseInt(element.value) || 0;

  if (hours > 23) {
      hours = 23;
      document.getElementById("minutes").value = "59"; // Set minutes to 59
      document.getElementById("seconds").value = "59"; // Set seconds to 59
  } else {
      hours = Math.max(0, Math.min(23, hours));
  }

  hours = (hours < 10 ? "0" : "") + hours;
  element.value = hours;
}

function validateMinutes(element) {
  var minutes = parseInt(element.value) || 0;

  if (minutes > 59) {
      minutes = 59;
      document.getElementById("seconds").value = "59"; // Set seconds to 59
  } else {
      minutes = Math.max(0, Math.min(59, minutes));
  }

  minutes = (minutes < 10 ? "0" : "") + minutes;
  element.value = minutes;
}


function validateSeconds(element) {
  var seconds = parseInt(element.value) || 0;
  seconds = Math.max(0, Math.min(59, seconds));
  seconds = (seconds < 10 ? "0" : "") + seconds;
  element.value = seconds;
}

function timerRange(){
    var value = parseInt(document.getElementById("timerRange").value);
    var hours = parseInt(value/60);
    var minutes = (value % 60);
    document.getElementById("hours").value = (hours < 10 ? "0" : "") + hours;
    document.getElementById("minutes").value = (minutes < 10 ? "0" : "") + minutes;
}



// function resetButtonStates() {
//     document.querySelectorAll('.retro-button').forEach(button => {
//         button.classList.remove('active');
//     });
// }

// document.querySelectorAll('.retro-button').forEach(button => {
//     button.addEventListener('click',function(){
//         resetButtonStates();
//         this.classList.add('active');

//     });
// });
