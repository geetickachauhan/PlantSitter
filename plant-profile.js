var weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
var freq_dict = {0: 'Every Week', 1: 'Every 2 Weeks', 2: 'Every Month'};
var light_dict = {0: 'Direct', 1: 'Indirect'};
var health_dict = {0: 'Healthy', 1: 'Sick'};
var trimming_dict = {0: 'Yes', 1: 'No'};

$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    // in the future, this won't be under document.ready. It will basically be called by whichever page leads to this profile page because they need to pass in registered user and the flag stating whether they are looking at their own profile
    createNavbar();
    mode = 1; // if mode is 0, you are looking at someone else's profile and shouldn't be able to edit
//    console.log(current_plant);
    showProfile(mode, current_plant['photo_url'], current_plant['name'], current_plant['type'], current_plant['watering_freq'], current_plant['fertilizer_freq'], current_plant['pesticide_freq'], current_plant['health'], current_plant['light'], current_plant['trimming'], current_plant['instructions']);
});

function showProfile(own, photo, name, type, watering, fertilizer, pesticide, health, light, trimming, instructions){
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
       if(own == 1){
        edit_elt = Util.one('#g-edit');
        edit_elt.innerHTML = '<span class="float-right"><button class="btn btn-light" id="g-edit-button"><span class="fas fa-pencil-alt fa-2x"></span></button></span>';
        savebutton = Util.create('button', {'id': 'g-save-button'});
        savebutton.classList.add('btn', 'btn-info', 'g-display-none', 'float-right');
        savebutton.innerHTML = "Save";
        edit_elt.appendChild(savebutton);
       // next add an event listener for edit such that it replaces things
       // also for save just read what the checkbox values are and then update accordingly
        Util.one('#g-edit-button').addEventListener('click', function(){
           Util.one('#g-photo').innerHTML = 
               `<button class="btn btn-info g-big-button">
                    <span class="fas fa-camera fa-5x"></span>
                </button>`; 
            Util.one('#g-plantname').innerHTML = '<input type="text" class="form-control" id="plantname-input">';
            Util.one('#g-planttype').innerHTML = '<input type="text" class="form-control" id="planttype-input">';
           
            Util.removeAllChildren(Util.one('#g-watering'));
            addWeekdaySelector(Util.one('#g-watering'), 1);

            
            Util.removeAllChildren(Util.one('#g-fertilizer'));
            addWeekdaySelector(Util.one('#g-fertilizer'), 2);
            
            Util.removeAllChildren(Util.one('#g-pesticide'));
            addWeekdaySelector(Util.one('#g-pesticide'), 3);
            
            var values = ["everyweek", "every2weeks", "everymonth"];
            var labels = ["Every Week", "Every 2 Weeks", "Every Month"];
            Util.removeAllChildren(Util.one('#g-watering-freq'));
            addRadioButtons(Util.one('#g-watering-freq'), "watering", values, labels);
            
            Util.removeAllChildren(Util.one('#g-fertilizer-freq'));
            addRadioButtons(Util.one('#g-fertilizer-freq'), "fertilizer", values, labels);
            
            Util.removeAllChildren(Util.one('#g-pesticide-freq'));
            addRadioButtons(Util.one('#g-pesticide-freq'), "pesticide", values, labels);
            
            Util.removeAllChildren(Util.one('#g-healthstatus'));
            addRadioButtons(Util.one('#g-healthstatus'), "healthstatus", ['healthy', 'sick'], ['Healthy', 'Sick']);
            
            Util.removeAllChildren(Util.one('#g-light'));
            addRadioButtons(Util.one('#g-light'), "light", ['direct', 'indirect'], ['Direct', 'Indirect']);
            
            Util.removeAllChildren(Util.one('#g-trimming'));
            addRadioButtons(Util.one('#g-trimming'), "trimming", ['yes', 'no'], ['Yes', 'No']);
            
             // TODO
            // only issue is have to make sure the correct weekday selector is already selected
            //             input.setAttribute("id", "weekday-"+weekdays[i] + id);
//            var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
//    var labels = ["M", "T", "W", "T", "F", "S", "S"];
            Util.one('#g-specialinstructions').innerHTML = '<textarea class="form-control" id="specialinstructions-input" rows="4"></textarea>';
            Util.one('#specialinstructions-input').value = current_plant['instructions'];
            Util.one('#plantname-input').value = current_plant['name'];
            Util.one('#planttype-input').value = current_plant['type'];
            Util.one('#g-edit-button').classList.add('g-display-none');
            Util.one('#g-save-button').classList.remove('g-display-none');
        });
           
//             Util.one('#save-button').addEventListener('click', function(){
//            // find a way to edit the json based on logged in user
//            logged_in_user['firstName'] = Util.one('#firstName-input').value;
//            logged_in_user['lastName'] = Util.one('#lastName-input').value;
//            logged_in_user['phone'] = Util.one('#phone-input').value;
//            logged_in_user['email'] = Util.one('#email-input').value;
//            logged_in_user['description'] = Util.one('#description-input').value;
//            // basically the user will have different stuff during the session but no database changes
//            // have been made
//            Util.one('#name').innerHTML = logged_in_user['firstName'] + " " + logged_in_user["lastName"];
//            Util.one('#phone').innerHTML = logged_in_user['phone'];
//            Util.one('#email').innerHTML = logged_in_user['email']; 
//            Util.one('#description').innerHTML = logged_in_user['description'];
//            Util.one('#save-button').classList.add('g-display-none');
//            Util.one('#edit-button').classList.remove('g-display-none');
//    });
    }
    
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