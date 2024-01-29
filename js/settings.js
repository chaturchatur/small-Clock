localStorage.setItem("preferredColour", "yellow");
var htmlElement = document.documentElement;
var radioButtons = document.querySelectorAll('input[name="btnradio"]');

const colorsHex = {
    yellow : "#FFEE58",
    teal : "#64FFDA",
    purple : "#536dfe"
};

const colorsRGB = {
    yellow : "255, 238, 88",
    teal : "100, 255, 218",
    purple: "83, 109, 254"
};

// Add a change event listener to each radio button
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {
        var selectedValue = this.value;
        
        var previewClock = document.getElementById('card-preview-clock');
        var previewBtn = document.getElementById('card-preview-btn');

        previewBtn.style.backgroundColor = colorsHex[selectedValue];
        previewBtn.style.boxShadow = `0 5px rgba(${colorsRGB[selectedValue]}, 0.5)`;
        previewClock.style.color = colorsHex[selectedValue];
    });
});

function setPreferences(){
    var selectColour = localStorage.getItem("preferredColour");
    htmlElement.setAttribute("data-bs-theme", selectColour);
}

function resetPreferences(){
    localStorage.setItem("preferredColour", "yellow");
    setPreferences();
}

document.getElementById("settings-form").addEventListener("submit", function(event){
    event.preventDefault();

    let selectedValue;
    
    radioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
            selectedValue = radioButton.value;
        }
    });

    localStorage.setItem("preferredColour", selectedValue);
    setPreferences();
});

setPreferences();



