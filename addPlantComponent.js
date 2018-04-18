// using the example from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay_text
// if you want below function to also create the div that creates the overlay, follow this
// https://www.safaribooksonline.com/library/view/javascript-cookbook/9781449390211/ch13s07.html
function createAddPlantOverlay(){
//    document.getElementById("overlay").style.display = "block";
    
    // create overlay and append to page
    var overlay = create("div");
    overlay.setAttribute("id","overlay");
//    overlay.setAttribute("onclick", "removeAddPlantOverlay()");
    // later we want to be more sophisticated and remove this only when clicked outside the form
    
    
    //create a form
    var box = create("div");
    box.setAttribute("id", "box");
//    form.setAttribute("onclick", "none");
//    box.setAttribute("cursor", "default");
    
    box.innerHTML = '<div id="photo"><button class="btn btn-info"><span class="fas fa-camera fa-5x"></span></button></div><div id="plant-name" class="formgroup"><div class="formtext">Nickname</div><div class="forminput"><input type="text" class="form-control" id="name" placeholder="Plant Nickname"></div></div><div id="plant-type" class="formgroup"><div class="formtext"><span class="fas fa-leaf fa-2x margin-right text-green"></span><div>Type</div></div><div class="forminput"><input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)"></div></div><div id="watering" class="formgroup"><div class="formtext"><span class="fas fa-tint fa-2x margin-right text-aqua"></span>Watering Frequency</div><div class="forminput"></div><div class="forminput-small"></div></div><div id="fertilizer"><div class="formtext"><span class="fas fa-poo fa-2x margin-right text-brown"></span>Fertilizer Frequency</div><div class="forminput"></div><div class="forminput-small"></div></div><div id="pesticide"><div class="formtext"><span class="fas fa-bug fa-2x margin-right text-gray"></span>Pesticide Frequency</div><div class="forminput"></div><div class="forminput-small"></div></div><div id="health" class="formgroup"><div class="formtext"><span class="fas fa-heartbeat fa-2x margin-right text-red"></span>Health Status</div><div class="forminput"></div></div><div id="sunlight"><div class="formtext"><span class="fas fa-lightbulb fa-2x margin-right text-yellow"></span>Light Intensity</div><div class="forminput"></div></div><div id="trimming"><div class="formtext"><span class="fas fa-cut fa-2x margin-right"></span>Requires Trimming</div><div class="forminput"></div></div><div id="special-instructions" class="formgroup"><div class="formtext-small"><span class="fas fa-info-circle fa-2x margin-right text-orange"></span></div><div class="forminput"><input type="text" class="form-control" id="special-instructions" placeholder="Special Instructions"></div></div><div id="save"><button class="btn btn-primary"><span class="fas fa-plus-circle fa-3x"></span></button></div>'
    
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    
    // now we are going to add repeated elements and give functionality such that pressing start triggers the remove 
    var watering = select("#watering .forminput");
    addWeekdaySelector(watering, 1);
    watering = select("#watering .forminput-small");
    var values = ["everyweek", "every2weeks", "everymonth"];
    var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
    addRadioButtons(watering, "watering", values, labels);
    
    fertilizer = select("#fertilizer .forminput");
    addWeekdaySelector(fertilizer, 2);
    fertilizer = select("#fertilizer .forminput-small");
    addRadioButtons(fertilizer, "fertilizer", values, labels);
    
    pesticide = select("#pesticide .forminput");
    addWeekdaySelector(pesticide, 3);
    pesticide = select("#pesticide .forminput-small");
    addRadioButtons(pesticide, "pesticide", values, labels);
    
    health = select("#health .forminput");
    addRadioButtons(health, "health", ["healthy", "sick"], ["Healthy", "Sick"]);
    
    sunlight = select("#sunlight .forminput");
    addRadioButtons(sunlight, "sunlight", ["direct", "indirect"], ["Direct", "Indirect"]);
    
    trimming = select("#trimming .forminput");
    addRadioButtons(trimming, "trimming", ["yes", "no"], ["Yes", "No"]);
	//creates an overlay
	//appends all the labels and inputs to the overlay
	//find widgets for weekly calendar (and pontentially implement listeners )

	//listener for save which reads the inputs and makes an instance of the plant logic, create a plant component
	// and closes the overlay
    select("#save button").addEventListener('click', removeAddPlantOverlay);

   
}

function removeAddPlantOverlay(){
//    document.getElementById("overlay").style.display = "none";
    overlay = document.getElementById("overlay");
    removeAllChildren(overlay);
    document.body.removeChild(overlay);
}

// basis of https://codepen.io/anon/pen/dmEMZp
function addWeekdaySelector(elt, id){
    var selector = document.createElement("div");
    selector.classList.add("weekDays-selector");
    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var labels = ["M", "T", "W", "T", "F", "S", "S"];
    for(i=0; i<weekdays.length; i++){
        var input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "weekday-"+weekdays[i] + id);
        input.setAttribute("class", "weekday");
        selector.appendChild(input);
        var label = document.createElement("label");
        label.setAttribute("for", "weekday-"+weekdays[i] + id);
        label.innerHTML = labels[i];
        selector.appendChild(label);
    }
    elt.appendChild(selector);
}

function addRadioButtons(elt, name, values, labels){
//    <div class="radio">
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="everyweek" checked>Every Week
//                    </label>
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="every2weeks">Every 2 Weeks
//                    </label>
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="everymonth">Every Month
//                    </label>
//                </div>
    // for above, values = ["everyweek", "every2weeks", "everymonth"] and labels = ["Every Week" ...]
    var radio = document.createElement("div");
    radio.classList.add("radio");
    for(i=0; i< values.length; i++){
        var label = document.createElement("label");
        var input = document.createElement("input");
        input.setAttribute("class", "formradio");
        input.setAttribute("type", "radio");
        input.setAttribute("name", name);
        input.setAttribute("value", values[i]);
        if(i == 0){input.checked = true;}
        label.appendChild(input);
        label.innerHTML += labels[i];
        radio.appendChild(label);
    }
    elt.appendChild(radio);
    
}

/*
Remove all children of an element
*/
function removeAllChildren(elt) {
    if(elt == null){
        return;
    }
  while (elt.hasChildNodes()) {
    clear(elt.firstChild);
  }
}
/*
helper method to clear first child recursively
*/
function clear(elt) {
  while (elt.hasChildNodes()) {
    clear(elt.firstChild);
  }
  elt.parentNode.removeChild(elt);
}
function select(x){
    return document.querySelector(x);
}
function create(x){
    return document.createElement(x);
}
// used by the modal
function go(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('overlay');
    if (event.target == modal) {
//        modal.style.display = "none";
        console.log("target is overlay");
        removeAddPlantOverlay();
    }
     console.log("target is not overlay");
}
// keep below: in case you want to update the innerHTML of box
//<div id="overlay">
//    <div id="box">
//        <div id="photo">
//        <button class="btn btn-info">
//            <span class="fas fa-camera fa-5x"></span>
//        </button>
//        </div>
//        <div id="plant-name" class="formgroup">
//            <div class="formtext">Nickname</div>
//            <div class="forminput">
//                <input type="text" class="form-control" id="name" placeholder="Plant Nickname">
//            </div>
//        </div>
//        <div id="plant-type" class="formgroup">
//            <div class="formtext">
//                <span class="fas fa-leaf fa-2x margin-right text-green"></span>
//                <div>Type</div>
//            </div>
//            <div class="forminput">
//                <input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)">
//            </div>
//        </div>
//        <div id="watering" class="formgroup">
//            <div class="formtext"><span class="fas fa-tint fa-2x margin-right text-aqua"></span>Watering Frequency</div>
//            <div class="forminput">
//<!--                call insert checks-->
//            </div>
//            <div class="forminput-small">
//<!--                call insert radios-->
//            </div>
//        </div>
//        <div id="fertilizer">
//             <div class="formtext"><span class="fas fa-poo fa-2x margin-right text-brown"></span>Fertilizer Frequency</div>
//            <div class="forminput">
//<!--                call insert checks-->
//            </div>
//            <div class="forminput-small">
//<!--                call insert radios-->
//            </div>
//        </div>
//        <div id="pesticide">
//            <div class="formtext"><span class="fas fa-bug fa-2x margin-right text-gray"></span>Pesticide Frequency</div>
//            <div class="forminput">
//<!--                call insert checks-->
//            </div>
//            <div class="forminput-small">
//<!--                call insert radios-->
//            </div>
//        </div>
//        <div id="health" class="formgroup">
//            <div class="formtext"><span class="fas fa-heartbeat fa-2x margin-right text-red"></span>Health Status</div>
//            <div class="forminput">
//<!--            call insert radios-->
//            </div>
//        </div>
//        <div id="sunlight">
//            <div class="formtext"><span class="fas fa-lightbulb fa-2x margin-right text-yellow"></span>Light Intensity</div>
//            <div class="forminput">
//<!--            call insert radios-->
//            </div>
//        </div>
//        <div id="trimming">
//            <div class="formtext"><span class="fas fa-cut fa-2x margin-right"></span>Requires Trimming</div>
//            <div class="forminput">
//<!--            call insert radios-->
//            </div>
//        </div>
//        <div id="special-instructions" class="formgroup">
//            <div class="formtext-small"><span class="fas fa-info-circle fa-2x margin-right text-orange"></span></div>
//            <div class="forminput"><input type="text" class="form-control" id="special-instructions" placeholder="Special Instructions">
//            </div>
//        </div>
//        <div id="save">
//            <button class="btn btn-primary"><span class="fas fa-plus-circle fa-3x"></span></button>
//        </div>
//    </div>
//</div>