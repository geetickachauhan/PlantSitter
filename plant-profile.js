var weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
var freq_dict = {0: 'Every Week', 1: 'Every 2 Weeks', 2: 'Every Month'};
var light_dict = {0: 'Direct', 1: 'Indirect'};
var health_dict = {0: 'Healthy', 1: 'Sick'};
var trimming_dict = {0: 'Yes', 1: 'No'};

$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    createNavbar();

    let mode = parseInt(sessionStorage.getItem('mode'));
    let current_plant = JSON.parse(sessionStorage.getItem('current_plant'));
    showProfile(mode, current_plant);

});

function showProfile(own, current_plant){
    updatePlantView(current_plant);
       if(own == 1){
        edit_enable(current_plant);
    }
    
}
function updatePlantView(current_plant){
    watering = current_plant['watering_freq'], fertilizer = current_plant['fertilizer_freq'], pesticide = current_plant['fertilizer_freq'], health = current_plant['health'], light = current_plant['light'], trimming = current_plant['trimming'], photo=current_plant['photo_url'], name = current_plant['name'], type = current_plant['type'], instructions = current_plant['instructions']; 
    if(photo != ""){
        Util.one('#g-photo').innerHTML = "<img src='"+photo+"'>";
    }
    else{
        Util.one('#g-photo').innerHTML = "<img src='images/plant_photoholder.png'>";
    }
    Util.one('#g-plantname').innerHTML = name;
    Util.one('#g-planttype').innerHTML = type;
    // now it is time to append the weekday divs
    appendWeekdayDivs(Util.one('#g-watering'), watering[0]);
    Util.one('#g-watering-freq').innerHTML = freq_dict[watering[1]];

    appendWeekdayDivs(Util.one('#g-fertilizer'), fertilizer[0]);
    Util.one('#g-fertilizer-freq').innerHTML = freq_dict[fertilizer[1]];

    appendWeekdayDivs(Util.one('#g-pesticide'), pesticide[0]);
    Util.one('#g-pesticide-freq').innerHTML = freq_dict[pesticide[1]];

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
           `<label class="btn btn-info g-big-button label-center">
                <span class="fas fa-camera fa-5x"></span>
                <input type="file" hidden>
            </label>`; 
        Util.one('#g-plantname').innerHTML = '<input type="text" class="form-control" id="plantname-input">';
        Util.one('#g-planttype').innerHTML = '<input type="text" class="form-control" id="planttype-input">';

        Util.removeAllChildren(Util.one('#g-watering'));
        addWeekdaySelector(Util.one('#g-watering'), "watering");
        selectWeekdayCheckBox(watering[0], "watering");

        Util.removeAllChildren(Util.one('#g-fertilizer'));
        addWeekdaySelector(Util.one('#g-fertilizer'), "fertilizer");
        selectWeekdayCheckBox(fertilizer[0], "fertilizer");

        Util.removeAllChildren(Util.one('#g-pesticide'));
        addWeekdaySelector(Util.one('#g-pesticide'), "pesticide");
        selectWeekdayCheckBox(pesticide[0], "pesticide");

        var values = ["everyweek", "every2weeks", "everymonth"];
        var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
        Util.removeAllChildren(Util.one('#g-watering-freq'));
        addRadioButtons(Util.one('#g-watering-freq'), "watering", values, labels);
        selectRadioButtons("watering", values, watering[1]);

        Util.removeAllChildren(Util.one('#g-fertilizer-freq'));
        addRadioButtons(Util.one('#g-fertilizer-freq'), "fertilizer", values, labels);
        selectRadioButtons("fertilizer", values, fertilizer[1]);

        Util.removeAllChildren(Util.one('#g-pesticide-freq'));
        addRadioButtons(Util.one('#g-pesticide-freq'), "pesticide", values, labels);
        selectRadioButtons("pesticide", values, pesticide[1]);

        Util.removeAllChildren(Util.one('#g-healthstatus'));
        addRadioButtons(Util.one('#g-healthstatus'), "healthstatus", ['healthy', 'sick'], ['Healthy', 'Sick']);
        selectRadioButtons("healthstatus", ["healthy", "sick"], health);

        Util.removeAllChildren(Util.one('#g-light'));
        addRadioButtons(Util.one('#g-light'), "light", ['direct', 'indirect'], ['Direct', 'Indirect']);
        selectRadioButtons("light", ["direct", "indirect"], light);

        Util.removeAllChildren(Util.one('#g-trimming'));
        addRadioButtons(Util.one('#g-trimming'), "trimming", ['yes', 'no'], ['Yes', 'No']);
        selectRadioButtons("trimming", ["yes", "no"], trimming);

        Util.one('#g-specialinstructions').innerHTML = '<textarea class="form-control" id="specialinstructions-input" rows="4"></textarea>';
        Util.one('#specialinstructions-input').value = current_plant['instructions'];
        Util.one('#plantname-input').value = current_plant['name'];
        Util.one('#planttype-input').value = current_plant['type'];
        Util.one('#g-edit-button').classList.add('g-display-none');
        Util.one('#g-save-button').classList.remove('g-display-none');
    });
       // now just have to make the save button work
       // TODO: make the save button work
        Util.one('#g-save-button').addEventListener('click', function(){
            // find a way to edit the json based on logged in user
            // read the buttons and then store it in the variable -- ask farnaz how she does this. Is there a function for this.
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
            
            
            // now need to read the various textboxes and radio buttons and change the values of watering, pesticide, etc. This is dependent on the id's that you set in the edit
            
            
            // basically the user will have different stuff during the session but no database changes
            // have been made
//            Util.one('#g-plantname').innerHTML = current_plant['name'];
//            Util.one('#g-planttype').innerHTML = current_plant['type'];
//            Util.one('#g-specialinstructions').innerHTML = current_plant['instructions'];
//            Util.one('#g-photo').innerHTML = "<img src='" +current_plant['photo_url']+ "'>";
            
            Util.removeAllChildren(Util.one('#g-watering'));
            Util.removeAllChildren(Util.one('#g-watering-freq'));
            Util.removeAllChildren(Util.one('#g-fertilizer'));
            Util.removeAllChildren(Util.one('#g-fertilizer-freq'));
            Util.removeAllChildren(Util.one('#g-pesticide'));
            Util.removeAllChildren(Util.one('#g-pesticide-freq'));
            Util.removeAllChildren(Util.one('#g-healthstatus'));
            Util.removeAllChildren(Util.one('#g-light'));
            Util.removeAllChildren(Util.one('#g-trimming'));
//            appendWeekdayDivs(Util.one('#g-watering'), watering[0]);
//    Util.one('#g-watering-freq').innerHTML = freq_dict[watering[1]];
//
//    appendWeekdayDivs(Util.one('#g-fertilizer'), fertilizer[0]);
//    Util.one('#g-fertilizer-freq').innerHTML = freq_dict[fertilizer[1]];
//
//    appendWeekdayDivs(Util.one('#g-pesticide'), pesticide[0]);
//    Util.one('#g-pesticide-freq').innerHTML = freq_dict[pesticide[1]];
//
//    Util.one('#g-healthstatus').innerHTML = health_dict[health];
//    Util.one('#g-light').innerHTML = light_dict[light];
//    Util.one('#g-trimming').innerHTML = trimming_dict[trimming];
            updatePlantView(current_plant);
            
            Util.one('#g-save-button').classList.add('g-display-none');
            Util.one('#g-edit-button').classList.remove('g-display-none');
        });
}