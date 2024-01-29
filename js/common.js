var htmlElement = document.documentElement;

function setPreferences(){
    var selectColour = localStorage.getItem("preferredColour");
    htmlElement.setAttribute("data-bs-theme", selectColour);
}

setPreferences();