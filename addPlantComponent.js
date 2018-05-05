// using the example from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay_text
// if you want below function to also create the div that creates the overlay, follow this
// https://www.safaribooksonline.com/library/view/javascript-cookbook/9781449390211/ch13s07.html
function createAddPlantOverlay(){
//    document.getElementById("overlay").style.display = "block";

    // create overlay and append to page
    var overlay = create("div");
    overlay.setAttribute("id","overlay");
    overlay.classList.add("centerdiv");
//    overlay.setAttribute("onclick", "removeAddPlantOverlay()");
    // later we want to be more sophisticated and remove this only when clicked outside the form


    //create a form
    var box = create("div");
    box.setAttribute("id", "box");
//    box.classList.add("centerdiv");
//    form.setAttribute("onclick", "none");
//    box.setAttribute("cursor", "default");
    box.innerHTML = `
    <div class="row g-pad">
        <div class="col-sm-6">
                <div id="photo">
                    <label class="btn btn-info g-big-button">
                      <span class="fas fa-camera fa-5x"></span>
                        <input type="file" hidden>
                    </label>
                  </div>
        </div>
        <div class="col-sm-6">
            <div class="row g-pad">
                    <div class="col-sm-4">
                        Nickname
                    </div>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="name" placeholder="Plant Nickname">
                        <div class="invalid-feedback" id="e-plantname">Please enter alphabets</div>
                    </div>
            </div>
            <div class="row g-pad">
                    <div class="col-sm-2">
                        <span class="fas fa-leaf fa-2x text-green"></span> 
                    </div>
                    <div class="col-sm-2 eliminate-padding-right">
                        Type
                    </div>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)">
                        <div class="invalid-feedback" id="e-planttype">Alphabets only!</div>
                    </div>
            </div>
        </div>
    </div>
    <div class="row mt-4 mb-4">
        <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-1 eliminate-padding-right">
                        <span class="fas fa-tint fa-2x text-aqua"></span>
                    </div>
                    <div class="col-sm-2 small-font eliminate-padding-right">
                        Watering Frequency
                    </div>
                    <div class="col-sm-6 eliminate-padding-right" id="watering-weekdays">
                    </div>
                    <div class="col-sm-3" id="watering-frequency">
                    </div>
                </div>
        </div>
        <div class="col-sm-4">
                <div class="row">
                    <div class="col-sm-2 eliminate-padding-right">
                        <span class="fas fa-heartbeat fa-2x text-red"></span>
                    </div>
                    <div class="col-sm-6 small-font eliminate-padding-right">
                        Health Status
                    </div>
                    <div class="col-sm-4" id="health-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-4 mt-4">
        <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-1 eliminate-padding-right">
                        <span class="fas fa-poo fa-2x margin-right text-brown"></span>
                    </div>
                    <div class="col-sm-2 small-font eliminate-padding-right">
                        Fertilizer Frequency
                    </div>
                    <div class="col-sm-6 eliminate-padding-right" id="fertilizer-weekdays">
                    </div>
                    <div class="col-sm-3" id="fertilizer-frequency">
                    </div>
                </div>
        </div>
        <div class="col-sm-4">
                <div class="row">
                    <div class="col-sm-2 eliminate-padding-right">
                        <span class="fas fa-lightbulb fa-2x margin-right text-yellow"></span>
                    </div>
                    <div class="col-sm-6 small-font eliminate-padding-right">
                        Light Intensity
                    </div>
                    <div class="col-sm-4" id="light-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-4 mt-4">
        <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-1 eliminate-padding-right">
                        <span class="fas fa-bug fa-2x margin-right text-gray"></span>
                    </div>
                    <div class="col-sm-2 small-font eliminate-padding-right">
                        Pesticide Frequency
                    </div>
                    <div class="col-sm-6 eliminate-padding-right" id="pesticide-weekdays">
                    </div>
                    <div class="col-sm-3" id="pesticide-frequency">
                    </div>
                </div>
        </div>
        <div class="col-sm-4">
                <div class="row">
                    <div class="col-sm-2 eliminate-padding-right">
                        <span class="fas fa-cut fa-2x margin-right"></span>
                    </div>
                    <div class="col-sm-6 small-font eliminate-padding-right">
                        Requires Trimming
                    </div>
                    <div class="col-sm-4" id="trimming-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-3 mt-3">
        <div class="col-sm-1">
            <span class="fas fa-info-circle fa-2x margin-right text-orange"></span>
        </div>
        <div class="col-sm-7">
            <input type="text" class="form-control" id="special-instructions" placeholder="Special Instructions">
        </div>
        <div class="col-sm-4">
                <div id="save" class="centerdiv">
                  <button class="btn btn-secondary g-big-button">
                    <span class="fas fa-plus-circle fa-3x"></span>
                  </button>
                </div>
        </div>
    </div>
    `;


    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // now we are going to add repeated elements and give functionality such that pressing start triggers the remove
    var watering = Util.one("#watering-weekdays");
    addWeekdaySelector(watering, 1);
    watering = Util.one("#watering-frequency");
    var values = ["everyweek", "every2weeks", "everymonth"];
    var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
    addRadioButtons(watering, "watering", values, labels);
    
    health = Util.one("#health-frequency");
    addRadioButtons(health, "health", ["healthy", "sick"], ["Healthy", "Sick"]);

    fertilizer = Util.one("#fertilizer-weekdays");
    addWeekdaySelector(fertilizer, 2);
    fertilizer = Util.one("#fertilizer-frequency");
    addRadioButtons(fertilizer, "fertilizer", values, labels);
    
    sunlight = Util.one("#light-frequency");
    addRadioButtons(sunlight, "sunlight", ["direct", "indirect"], ["Direct", "Indirect"]);

    pesticide = select("#pesticide-weekdays");
    addWeekdaySelector(pesticide, 3);
    pesticide = select("#pesticide-frequency");
    addRadioButtons(pesticide, "pesticide", values, labels);
    
    trimming = select("#trimming-frequency");
    addRadioButtons(trimming, "trimming", ["yes", "no"], ["Yes", "No"]);

	//listener for save which reads the inputs and makes an instance of the plant logic, create a plant component
	// and closes the overlay
    //


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

//  <div class="form-check">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
//  <label class="form-check-label" for="exampleRadios1">
//    Default radio
//  </label>
//</div>
//<div class="form-check">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
//  <label class="form-check-label" for="exampleRadios2">
//    Second default radio
//  </label>
//</div>
//<div class="form-check disabled">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
//  <label class="form-check-label" for="exampleRadios3">
//    Disabled radio
//  </label>
//</div>
    var radio = document.createElement("div");
    radio.classList.add("g-radio-button");
    for(i=0; i< values.length; i++){
        var div = document.createElement("div");
        div.classList.add("form-check");
        var label = Util.create("label", {'for': "radio-" + name + values[i], 'class': 'form-check-label'});
        var input = Util.create("input", {'class': 'form-check-input', 'type': 'radio', 'name': name, 'value': values[i], 'id': "radio-" + name + values[i]});
        if(i == 0){input.checked = true;}
        div.appendChild(input);
        div.appendChild(label);
        label.innerHTML += labels[i];
        radio.appendChild(div);
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
        if (window.confirm("Are you sure you want to exit without adding the plant?")) { 
            removeAddPlantOverlay();
        }
    }
}
    
//    box.innerHTML = `
//    <div id="photo" class=“centerdiv”>
//    <label class="btn btn-info g-big-button label-center">
//      <span class="fas fa-camera fa-5x"></span>
//        <input type="file" hidden>
//    </label>
//  </div>
//  <div id="plant-name" class="formgroup centerdiv">
//    <div class="formtext centerdiv">Nickname</div>
//    <div class="forminput centerdiv">
//      <input type="text" class="form-control" id="name" placeholder="Plant Nickname">
//    </div>
//    </div>
//    <div id="plant-type" class="formgroup centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-leaf fa-2x margin-right text-green"></span>
//          <div>Type</div>
//      </div>
//      <div class="forminput centerdiv">
//        <input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)">
//      </div>
//    </div>
//    <div id="watering" class="formgroup centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-tint fa-2x margin-right text-aqua"></span>
//        Watering Frequency
//      </div>
//      <div class="forminput centerdiv"></div>
//      <div class="forminput-small"></div>
//    </div>
//    <div id="fertilizer" class="centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-poo fa-2x margin-right text-brown"></span>
//          Fertilizer Frequency
//      </div>
//      <div class="forminput centerdiv"></div>
//      <div class="forminput-small"></div>
//    </div>
//    <div id="pesticide" class="centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-bug fa-2x margin-right text-gray"></span>
//        Pesticide Frequency
//      </div>
//      <div class="forminput centerdiv"></div>
//      <div class="forminput-small"></div>
//    </div>
//    <div id="health" class="formgroup centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-heartbeat fa-2x margin-right text-red"></span>
//        Health Status
//      </div>
//      <div class="forminput binary-form"></div>
//    </div>
//    <div id="sunlight" class="centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-lightbulb fa-2x margin-right text-yellow"></span>
//        Light Intensity
//      </div>
//      <div class="forminput binary-form"></div>
//    </div>
//    <div id="trimming" class="centerdiv">
//      <div class="formtext centerdiv">
//        <span class="fas fa-cut fa-2x margin-right"></span>
//        Requires Trimming
//      </div>
//      <div class="forminput binary-form"></div>
//    </div>
//    <div id="special-instructions" class="formgroup centerdiv">
//      <div class="formtext-small centerdiv">
//        <span class="fas fa-info-circle fa-2x margin-right text-orange"></span>
//      </div>
//      <div class="forminput centerdiv">
//        <input type="text" class="form-control" id="special-instructions" placeholder="Special Instructions">
//      </div>
//    </div>
//    <div id="save" class="centerdiv">
//      <button class="btn btn-secondary g-big-button">
//        <span class="fas fa-plus-circle fa-3x"></span>
//      </button>
//    </div>
//  `;