var weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
var freq_dict = {2: 'Every Week', 1: 'Every 2 Weeks', 0: 'Every Month'};
var light_dict = {1: 'Direct', 0: 'Indirect'};
var health_dict = {1: 'Healthy', 0: 'Sick'};
var trimming_dict = {1: 'Yes', 0: 'No'};
var pnvalid = true, ptvalid = true, wateringvalid = true, fertilizervalid = true, pesticidevalid = true; // this is to check if the plant name and type are written in the correct format

var logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));


$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    createNavbar();

    let mode = parseInt(sessionStorage.getItem('mode'));
    let current_plant = JSON.parse(sessionStorage.getItem('current_plant'));
    showProfile(mode, current_plant);

});

function showProfile(own, current_plant){
    updatePlantView(current_plant);
    if(own == 1)
    {
        edit_enable(current_plant);
    }

}
function areAllZero(variable){
    var haszeros = true;
    for(i=0; i<variable.length; i++){
        if(variable[i] != 0){
            haszeros = false;
            break;
        }
    }
    return haszeros;
}
function updatePlantView(current_plant){
    watering = current_plant['watering_freq'], fertilizer = current_plant['fertilizer_freq'], pesticide = current_plant['fertilizer_freq'], health = current_plant['health'], light = current_plant['light'], trimming = current_plant['trimming'], photo=current_plant['photo_url'], name = current_plant['name'], type = current_plant['type'], instructions = current_plant['instructions'];
    if(photo != ""){
        Util.one('#g-photo').innerHTML = "<img src='"+photo+"'>";
    }
    else{
        Util.one('#g-photo').innerHTML = "<img src='img/plant_photoholder.png'>";
    }
    Util.one('#g-plantname').innerHTML = name;
    Util.one('#g-planttype').innerHTML = type;
    // now it is time to append the weekday divs
    appendWeekdayDivs(Util.one('#g-watering'), watering[0]);
    if(areAllZero(watering[0])){
        Util.one('#g-watering-freq').innerHTML = "None";
    }
    else{
        Util.one('#g-watering-freq').innerHTML = freq_dict[watering[1]];
    }

    appendWeekdayDivs(Util.one('#g-fertilizer'), fertilizer[0]);
    if(areAllZero(fertilizer[0])){
        Util.one('#g-fertilizer-freq').innerHTML = "None";
    }
    else{
        Util.one('#g-fertilizer-freq').innerHTML = freq_dict[fertilizer[1]];
    }
    // TODO: check that if one of the checkboxes is not checked, make this display nothing

    appendWeekdayDivs(Util.one('#g-pesticide'), pesticide[0]);
    if(areAllZero(pesticide[0])){
        Util.one("#g-pesticide-freq").innerHTML = "None";
    }
    else{
        Util.one('#g-pesticide-freq').innerHTML = freq_dict[pesticide[1]];
    }

    Util.one('#g-healthstatus').innerHTML = health_dict[health];
    Util.one('#g-light').innerHTML = light_dict[light];
    Util.one('#g-trimming').innerHTML = trimming_dict[trimming];

    Util.one('#g-specialinstructions').innerHTML = instructions;
}

function appendWeekdayDivs(elt, vals){
    for(i=0; i<vals.length; i++){
        div = Util.create('div');
        div.classList.add("weekday-div");
        if(vals[i] == 1){
            div.classList.add("weekday-select");
        }
        else{
            div.classList.add("weekday-unselect");
        }
        div.innerHTML = weekdays[i];
        elt.appendChild(div);
    }
}
function selectWeekdayCheckBox(vals, id){
    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for(i=0; i<weekdays.length; i++){
        if(vals[i] == 1){
            Util.one("#weekday-"+weekdays[i]+id).checked = true;
        }
    }
}
function readWeekdayCheckBox(id){
    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var vals = [];
    for(i=0; i<weekdays.length; i++){
        if(Util.one("#weekday-"+weekdays[i]+id).checked){
            vals.push(1);
        }
        else{
            vals.push(0);
        }
    }
    return vals;
}
function readRadioButtons(name, values){
//    "radio-" + name + values[i]
    var val = 0;
    for(i=0; i<values.length; i++){
        if(Util.one('#radio-' + name + values[i]).checked){
            val = i;
        }
    }
    return val;
}
function selectRadioButtons(name, values, vals){
    Util.one("#radio-" + name + values[vals]).checked = true;
}


function edit_enable(current_plant){
    edit_elt = Util.one('#g-edit');
    edit_elt.innerHTML = '<span class="float-right"><button class="btn btn-light" id="g-edit-button"><span class="fas fa-pencil-alt fa-2x"></span></button></span>';
    savebutton = Util.create('button', {'id': 'g-save-button'});
    savebutton.classList.add('btn', 'btn-info', 'g-display-none', 'float-right');
    savebutton.innerHTML = "Save";
    edit_elt.appendChild(savebutton);
   // next add an event listener for edit such that it replaces things
   // also for save just read what the checkbox values are and then update accordingly
    Util.one('#g-edit-button').addEventListener('click', function(){
        watering = current_plant['watering_freq'], fertilizer = current_plant['fertilizer_freq'], pesticide = current_plant['fertilizer_freq'], health = current_plant['health'], light = current_plant['light'], trimming = current_plant['trimming'];
       Util.one('#g-photo').innerHTML =
           `<label class="btn btn-info g-big-button vertical-center">
                <span class="fas fa-camera fa-5x"></span>
                <input type="file" hidden>
            </label>`;


        plantname = Util.one('#g-plantname');
        plantname.classList.add("form-group");
        plantname.innerHTML = `<input type="text" class="form-control" id="plantname-input" oninput="Util.checkPattern(this, '^[A-z \-]+$', 'e-plantname', 'pnvalid')">
                                <div class="invalid-feedback g-small-text" id="e-plantname">Please enter only alphabets</div>`;

//        Util.one('#g-plantname').innerHTML = '<input type="text" class="form-control" id="plantname-input">';
        planttype = Util.one('#g-planttype');
        planttype.classList.add("form-group");
        planttype.innerHTML = `<input type="text" class="form-control" id="planttype-input" oninput="Util.checkPattern(this, '^[A-z \-]+$', 'e-planttype', 'ptvalid')">
                                <div class="invalid-feedback" id="e-planttype">Alphabets only!</div>`;
//        Util.one('#g-planttype').innerHTML = '<input type="text" class="form-control" id="planttype-input">';

        Util.removeAllChildren(Util.one('#g-watering'));
        Util.addWeekdaySelector(Util.one('#g-watering'), "watering", "wateringvalid", true);
        // TODO insert an invalid feedback div that appears if you uncheck the checkboxes and you try to press save
        // may need an onclick listener on the checkboxes to check if any of the checkboxes become 0, then we know that there is a problem
        // this idea is way too extended and we could simply have the errors for the checkboxes appear seperately
        selectWeekdayCheckBox(watering[0], "watering");

        Util.removeAllChildren(Util.one('#g-fertilizer'));
        Util.addWeekdaySelector(Util.one('#g-fertilizer'), "fertilizer", "fertilizervalid");
        selectWeekdayCheckBox(fertilizer[0], "fertilizer");

        Util.removeAllChildren(Util.one('#g-pesticide'));
        Util.addWeekdaySelector(Util.one('#g-pesticide'), "pesticide", "pesticidevalid");
        selectWeekdayCheckBox(pesticide[0], "pesticide");

        var values = ["everyweek", "every2weeks", "everymonth"];
        var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
        Util.removeAllChildren(Util.one('#g-watering-freq'));
        Util.addRadioButtons(Util.one('#g-watering-freq'), "watering", values, labels);
        selectRadioButtons("watering", values, watering[1]);

        Util.removeAllChildren(Util.one('#g-fertilizer-freq'));
        Util.addRadioButtons(Util.one('#g-fertilizer-freq'), "fertilizer", values, labels);
        selectRadioButtons("fertilizer", values, fertilizer[1]);

        Util.removeAllChildren(Util.one('#g-pesticide-freq'));
        Util.addRadioButtons(Util.one('#g-pesticide-freq'), "pesticide", values, labels);
        selectRadioButtons("pesticide", values, pesticide[1]);

        Util.removeAllChildren(Util.one('#g-healthstatus'));
        Util.addRadioButtons(Util.one('#g-healthstatus'), "healthstatus", ['healthy', 'sick'], ['Healthy', 'Sick']);
        selectRadioButtons("healthstatus", ["healthy", "sick"], health);

        Util.removeAllChildren(Util.one('#g-light'));
        Util.addRadioButtons(Util.one('#g-light'), "light", ['direct', 'indirect'], ['Direct', 'Indirect']);
        selectRadioButtons("light", ["direct", "indirect"], light);

        Util.removeAllChildren(Util.one('#g-trimming'));
        Util.addRadioButtons(Util.one('#g-trimming'), "trimming", ['yes', 'no'], ['Yes', 'No']);
        selectRadioButtons("trimming", ["yes", "no"], trimming);

        Util.one('#g-specialinstructions').innerHTML = '<textarea class="form-control" id="specialinstructions-input" rows="4"></textarea>';
        Util.one('#specialinstructions-input').value = current_plant['instructions'];
        Util.one('#plantname-input').value = current_plant['name'];
        Util.one('#planttype-input').value = current_plant['type'];
        Util.one('#g-edit-button').classList.add('g-display-none');
        Util.one('#g-save-button').classList.remove('g-display-none');
        Util.one('#g-delete-button').classList.remove('g-display-none');


        //disables save button if inputs are not valid
        let watering_inputs = Array.from(Util.one("#g-watering").children[0].children).filter(el => el.tagName == "INPUT");
        let validations = [...watering_inputs];
        validations.push(Util.one("#plantname-input"));
        validations.push(Util.one("#planttype-input"));

        validations.map(el => el.addEventListener("input", function(e){

          if (!pnvalid || !ptvalid || !wateringvalid)
            Util.one('#g-save-button').setAttribute("disabled", "true");
          else
          Util.one('#g-save-button').removeAttribute("disabled");
        }));
    });


    Util.one('#g-delete-button').addEventListener('click', function(){

      Util.one(".modal-body").children[0].innerText = "Do you really want to delete " + current_plant.name + "?";
      $('#delete_plant_modal').modal('show');
    });


    Util.one("#delete_plant_btn").addEventListener('click', function(){
      let registered_plants = Helpers.createPlantInstances(JSON.parse(localStorage.getItem('registered_plants')));
      registered_plants.splice(registered_plants.indexOf(current_plant), 1);
      localStorage.setItem('registered_plants', JSON.stringify(registered_plants));
      window.location.href = "homepage.html";

    });



   // now just have to make the save button work
   // TODO: make the save button work
    Util.one('#g-save-button').addEventListener('click', function(){
        // find a way to edit the json based on logged in user
        if(pnvalid == false || ptvalid == false || wateringvalid == false || fertilizervalid == false || pesticidevalid == false){
            //console.log("one of the inputs was not valid");

            return;
        }
        // TODO just check over here if the watering, fertlizer and pesticide frequency are ok.
        // basically none of the checkboxes should ever be empty when save is pressed
        // when you read watering[0] or fertilizer[0] or pesticide[0], it should never be 0000
        current_plant['name'] = Util.one('#plantname-input').value;
        current_plant['type'] = Util.one('#planttype-input').value;
        current_plant['instructions'] = Util.one('#specialinstructions-input').value;
        var watering = [], fertilizer = [], pesticide = [], health, light, trimming;
        var values = ["everyweek", "every2weeks", "everymonth"];
        watering[0] = readWeekdayCheckBox('watering');
        watering[1] = readRadioButtons('watering', values);

        fertilizer[0] = readWeekdayCheckBox('fertilizer');
        fertilizer[1] = readRadioButtons('fertilizer', values);

        pesticide[0] = readWeekdayCheckBox('pesticide');
        pesticide[1] = readRadioButtons('pesticide', values);

        health = readRadioButtons('healthstatus', ['healthy', 'sick']);
        light = readRadioButtons('light', ['direct', 'indirect']);
        trimming = readRadioButtons('trimming', ['yes', 'no']);

        current_plant['watering_freq'] = watering;
        current_plant['fertilizer_freq'] = fertilizer;
        current_plant['pesticide_freq'] = pesticide;
        current_plant['health'] = health;
        current_plant['light'] = light;
        current_plant['trimming'] = trimming;

        Util.removeAllChildren(Util.one('#g-watering'));
        Util.removeAllChildren(Util.one('#g-watering-freq'));
        Util.removeAllChildren(Util.one('#g-fertilizer'));
        Util.removeAllChildren(Util.one('#g-fertilizer-freq'));
        Util.removeAllChildren(Util.one('#g-pesticide'));
        Util.removeAllChildren(Util.one('#g-pesticide-freq'));
        Util.removeAllChildren(Util.one('#g-healthstatus'));
        Util.removeAllChildren(Util.one('#g-light'));
        Util.removeAllChildren(Util.one('#g-trimming'));
        updatePlantView(current_plant);

        Util.one('#g-save-button').classList.add('g-display-none');
        Util.one('#g-delete-button').classList.add('g-display-none');
        Util.one('#g-edit-button').classList.remove('g-display-none');
    });
}
