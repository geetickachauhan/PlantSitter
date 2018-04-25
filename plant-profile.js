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
    showProfile(mode, current_plant['photo_url'], current_plant['name'], current_plant['type'], current_plant['watering_freq'], current_plant['fertilizer_freq'], current_plant['pesticide_freq'], current_plant['health'], current_plant['light'], current_plant['trimming'], current_plant['instructions']);

});

function showProfile(own, photo, name, type, watering, fertilizer, pesticide, health, light, trimming, instructions){
    if(own == 1){
        Util.one('#g-edit').innerHTML = '<span class="float-right"><button class="btn btn-light" id="g-edit-button"><span class="fas fa-pencil-alt fa-2x"></span></button></span>';
//        Util.one('g-edit-button').addEventListener('click', function(){
//            createAddPlantOverlay();
//        });
    }
    Util.one('#g-photo').innerHTML = "<img src='"+photo+"'>";
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
