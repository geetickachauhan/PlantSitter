var pnvalid = false, ptvalid = false, wateringvalid = false, fertilizervalid = true, pesticidevalid = true; // this is to check if the plant name and type are written in the correct format
// using the example from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay_text
// if you want below function to also create the div that creates the overlay, follow this
// https://www.safaribooksonline.com/library/view/javascript-cookbook/9781449390211/ch13s07.html
function createAddPlantOverlay(){
//    document.getElementById("overlay").style.display = "block";
    // create overlay and append to page
    var overlay = Util.create("div");
    overlay.setAttribute("id","overlay");
//    overlay.classList.add("centerdiv");
//    overlay.setAttribute("onclick", "removeAddPlantOverlay()");
    // later we want to be more sophisticated and remove this only when clicked outside the form


    //create a form
    var box = Util.create("div");
    box.setAttribute("id", "box");
//    box.classList.add("centerdiv");
//    form.setAttribute("onclick", "none");
//    box.setAttribute("cursor", "default");
    box.innerHTML = `
    <div class="row g-pad">
        <div class="col-6">
                <div id="photo">
                    <label class="btn btn-info g-big-button vertical-center">
                      <span class="fas fa-camera fa-5x"></span>
                        <input type="file" hidden>
                    </label>
                  </div>
        </div>
        <div class="col-6">
            <div class="row g-pad">
                    <div class="col-4">
                        Nickname
                    </div>
                    <div class="col-8">
                        <input type="text" class="form-control" id="name" placeholder="Plant Nickname" oninput="Util.checkPattern(this, '^[A-z \-]+$', 'e-plantname', 'pnvalid')">
                        <div class="invalid-feedback" id="e-plantname">Hmm...Name with a number?</div>
                    </div>
            </div>
            <div class="row g-pad">
                    <div class="col-2">
                        <span class="fas fa-leaf fa-2x text-green"></span>
                    </div>
                    <div class="col-2 eliminate-padding-right">
                        Type
                    </div>
                    <div class="col-8">
                    <!--
                        <input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)" oninput="Util.checkPattern(this, '^[A-z\-\s]+$', 'e-planttype', 'ptvalid')">
                        -->
                        <input type="text" class="form-control" id="type" placeholder="Plant Type (eg. orchid, rose)" oninput="Util.checkPattern(this, '^[A-z \-]+$', 'e-planttype', 'ptvalid')">
                        <div class="invalid-feedback" id="e-planttype">Hmm...type with a number?</div>
                    </div>
            </div>
        </div>
    </div>
    <div class="row mt-4 mb-4">
        <div class="col-8">
                <div class="row">
                    <div class="col-1 eliminate-padding-right">
                        <span class="fas fa-tint fa-2x text-aqua"></span>
                    </div>
                    <div class="col-2 small-font eliminate-padding-right">
                        Watering Frequency
                    </div>
                    <div class="col-6 eliminate-padding-right" id="watering-weekdays">
                    </div>
                    <div class="col-3" id="watering-frequency">
                    </div>
                </div>
        </div>
        <div class="col-4">
                <div class="row">
                    <div class="col-2 eliminate-padding-right">
                        <span class="fas fa-heartbeat fa-2x text-red"></span>
                    </div>
                    <div class="col-6 small-font eliminate-padding-right">
                        Health Status
                    </div>
                    <div class="col-4" id="health-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-4 mt-4">
        <div class="col-8">
                <div class="row">
                    <div class="col-1 eliminate-padding-right">
                        <span class="fas fa-poo fa-2x margin-right text-brown"></span>
                    </div>
                    <div class="col-2 small-font eliminate-padding-right">
                        Fertilizer Frequency
                    </div>
                    <div class="col-6 eliminate-padding-right" id="fertilizer-weekdays">
                    </div>
                    <div class="col-3" id="fertilizer-frequency">
                    </div>
                </div>
        </div>
        <div class="col-4">
                <div class="row">
                    <div class="col-2 eliminate-padding-right">
                        <span class="fas fa-lightbulb fa-2x margin-right text-yellow"></span>
                    </div>
                    <div class="col-6 small-font eliminate-padding-right">
                        Light Intensity
                    </div>
                    <div class="col-4" id="light-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-4 mt-4">
        <div class="col-8">
                <div class="row">
                    <div class="col-1 eliminate-padding-right">
                        <span class="fas fa-bug fa-2x margin-right text-gray"></span>
                    </div>
                    <div class="col-2 small-font eliminate-padding-right">
                        Pesticide Frequency
                    </div>
                    <div class="col-6 eliminate-padding-right" id="pesticide-weekdays">
                    </div>
                    <div class="col-3" id="pesticide-frequency">
                    </div>
                </div>
        </div>
        <div class="col-4">
                <div class="row">
                    <div class="col-2 eliminate-padding-right">
                        <span class="fas fa-cut fa-2x margin-right"></span>
                    </div>
                    <div class="col-6 small-font eliminate-padding-right">
                        Requires Trimming
                    </div>
                    <div class="col-4" id="trimming-frequency">
                    </div>
                </div>
        </div>
    </div>
    <div class="row mb-3 mt-3">
        <div class="col-1">
            <span class="fas fa-info-circle fa-2x margin-right text-orange"></span>
        </div>
        <div class="col-7">
            <input type="text" class="form-control" id="special-instructions" placeholder="Special Instructions">
        </div>
        <div class="col-4">
                <div id="save" class="vertical-center">
                  <button class="btn btn-secondary g-big-button" disabled>
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
//    addWeekdaySelector(watering, 1);
    Util.addWeekdaySelector(watering, 1, "wateringvalid", true);
    watering = Util.one("#watering-frequency");
    var values = ["everyweek", "every2weeks", "everymonth"];
    var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
    Util.addRadioButtons(watering, "watering", values, labels);

    health = Util.one("#health-frequency");
    Util.addRadioButtons(health, "health", ["healthy", "sick"], ["Healthy", "Sick"]);

    fertilizer = Util.one("#fertilizer-weekdays");
//    addWeekdaySelector(fertilizer, 2);
    Util.addWeekdaySelector(fertilizer, 2, "fertilizervalid");
    // if you want to remove validation on that, just make sure to change Util.addWeekdaySelector to not include the function that seems to be called on input
    fertilizer = Util.one("#fertilizer-frequency");
    Util.addRadioButtons(fertilizer, "fertilizer", values, labels);

    sunlight = Util.one("#light-frequency");
    Util.addRadioButtons(sunlight, "sunlight", ["direct", "indirect"], ["Direct", "Indirect"]);

    pesticide = Util.one("#pesticide-weekdays");
//    addWeekdaySelector(pesticide, 3);
    Util.addWeekdaySelector(pesticide, 3, "pesticidevalid");
    pesticide = Util.one("#pesticide-frequency");
    Util.addRadioButtons(pesticide, "pesticide", values, labels);

    trimming = Util.one("#trimming-frequency");
    Util.addRadioButtons(trimming, "trimming", ["yes", "no"], ["Yes", "No"]);

	//listener for save which reads the inputs and makes an instance of the plant logic, create a plant component
	// and closes the overlay

  /*
    enable the save button if the inputs are correct
  */
  let must_be_valid_inputs = Array.from(Util.one("#watering-weekdays").children[0].children).filter(el => el.type == "checkbox");

  must_be_valid_inputs.push(Util.one("#name"));
  must_be_valid_inputs.push(Util.one("#type"));

  must_be_valid_inputs.map(el => el.addEventListener("input", function(e){
    if (pnvalid && ptvalid && wateringvalid)
      Util.one("#save").children[0].removeAttribute("disabled");
  }));

}

function removeAddPlantOverlay(){
//    document.getElementById("overlay").style.display = "none";
    overlay = document.getElementById("overlay");
    Util.removeAllChildren(overlay);
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


// used by the modal
function go(){
    var modal = Util.one('#myModal');
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = Util.one('#overlay');
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
