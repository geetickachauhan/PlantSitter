//listeners for profile.js buttons and inputs
//dynamically loads the content of profile

$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    var user = registered_users[0];
    showProfile(1, user['photo_url'], user['star'], user['name'], user['phone'], user['email'], user['description']);
});

function showProfile(own, photo, star, name, phone, email, description){
    // own is a flag that if set to 1, displays calendar, edit and add event to calendar
    var photo_elt = select('#photo');
    photo_elt.innerHTML = "<img src='"+photo+"'>";
    createStars(star);
    var name_elt = select('#name');
    name_elt.innerHTML = name;
    var phone_elt = select('#phone');
    phone_elt.innerHTML = phone;
    var email_elt = select('#email');
    email_elt.innerHTML = email;
    var description_elt = select('#description');
    description_elt.innerHTML = description;
    
    if(own == 1){
        select('#edit').innerHTML = '<button class="btn btn-light"><span class="fas fa-pencil-alt fa-2x"></span></button>';
//        select('#calendar-main').innerHTML = 'Calendar Main';
        select('#add-event').innerHTML = '<button class="btn btn-info"><span class="fas fa-plus-circle fa-2x"></span></button>';
        // have to do something about the calendar over here
    }
    
}


//How to create calendar using jQuery and CSS3
//https://designmodo.com/calendar-jquery-css3/

//open source calendars https://1stwebdesigner.com/calendar-ui-layout-css/
// Semantic UI https://codepen.io/nijin39/pen/JbQBXM


function createStars(num){
    // only accepts num between 1-5, where the stars can only be half or not
    if(num <1 || num >5){
        console.log("Given a value outside of the 1-5 range");
        return;
    }
    var half = false;
    full_stars = Math.floor(num);
    if(full_stars < num){
        half = true;
    }
    var star = select("#star");
    removeAllChildren(star);
    for(i=0; i<full_stars; i++){
        span = create('span');
        span.classList.add("fas", "fa-star", "text-green");
        star.appendChild(span);
    }
    if(half == true){
        span = create('span');
        span.classList.add("fas", "fa-star-half", "text-green");
        star.appendChild(span);
    }
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