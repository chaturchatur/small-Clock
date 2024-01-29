setInterval(function currentTime(){
    let date = new Date();
    let hh  = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    document.getElementById("hours").innerHTML = hh;
    document.getElementById("minutes").innerHTML = mm;
    document.getElementById("seconds").innerHTML = ss;
}, 1000);

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    document.getElementById("close-fl-bt").removeAttribute("hidden");
    document.getElementById("open-fl-bt").setAttribute("hidden", "hidden");
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
