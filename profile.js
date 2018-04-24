//listeners for profile.js buttons and inputs
//dynamically loads the content of profile

$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    // in the future, this won't be under document.ready. It will basically be called by whichever page leads to this profile page because they need to pass in registered user and the flag stating whether they are looking at their own profile
    createNavbar();
    mode = 1; // if mode is 0, you are looking at someone else's profile and shouldn't be able to edit
    showProfile(mode, logged_in_user['photo_url'], logged_in_user['star'], logged_in_user['firstName'], logged_in_user['lastName'], logged_in_user['phone'], logged_in_user['email'], logged_in_user['description']);


});

function showProfile(own, photo, star, first_name, last_name, phone, email, description){
    // own is a flag that if set to 1, displays calendar, edit and add event to calendar
    var photo_elt = Util.one('#photo');
    photo_elt.innerHTML = "<img src='"+photo+"'>";
    createStars(star);
    var edit_elt = Util.one('#edit');
    var name_elt = Util.one('#name');
    name_elt.innerHTML = first_name + " " + last_name;
    var phone_elt = Util.one('#phone');
    phone_elt.innerHTML = phone;
    var email_elt = Util.one('#email');
    email_elt.innerHTML = email;
    var description_elt = Util.one('#description');
    description_elt.innerHTML = description;

    if(own == 1){
        var editbutton = '<button class="btn btn-light" id="edit-button"><span class="fas fa-pencil-alt fa-2x"></span></button>'
        edit_elt.innerHTML = editbutton;
        savebutton = Util.create('button', {'id': 'save-button'});
        savebutton.classList.add('btn', 'btn-info', 'g-display-none');
        savebutton.innerHTML = "Save";
        edit_elt.appendChild(savebutton);
        
        // add click event listener for the edit button
        // then instead of edit show it as save and when save is pressed update the json
        Util.one('#edit-button').addEventListener('click', function(){
            Util.one('#phone').innerHTML = '<input type="phone" class="form-control small-input" id="phone-input">';
            Util.one('#email').innerHTML = '<input type="email" class="form-control small-input" id="email-input">'; 
//            Util.one('#description').innerHTML = '<input type="text" class="form-control small-input" id="description-input">';
            Util.one('#description').innerHTML = '<textarea class="form-control small-input" id="description-input" rows="2"></textarea>';
            Util.one('#phone-input').value = logged_in_user['phone'];
            Util.one('#email-input').value = logged_in_user['email'];
            Util.one('#description-input').value = logged_in_user['description'];
            Util.one('#edit-button').classList.add('g-display-none');
            Util.one('#save-button').classList.remove('g-display-none');
        });
        Util.one('#save-button').addEventListener('click', function(){
                // find a way to edit the json based on logged in user
                logged_in_user['phone'] = Util.one('#phone-input').value;
                logged_in_user['email'] = Util.one('#email-input').value;
                logged_in_user['description'] = Util.one('#description-input').value;
                // basically the user will have different stuff during the session but no database changes
                // have been made
                Util.one('#phone').innerHTML = logged_in_user['phone'];
                Util.one('#email').innerHTML = logged_in_user['email']; 
                Util.one('#description').innerHTML = logged_in_user['description'];
                Util.one('#save-button').classList.add('g-display-none');
                Util.one('#edit-button').classList.remove('g-display-none');
            });
        createCalendar();
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
    var star = Util.one("#star");
    Util.removeAllChildren(star);
//    removeAllChildren(star);
    for(i=0; i<full_stars; i++){
        span = Util.create('span');
        span.classList.add("fas", "fa-star", "text-green");
        star.appendChild(span);
    }
    if(half == true){
        span = Util.create('span');
        span.classList.add("fas", "fa-star-half", "text-green");
        star.appendChild(span);
    }
}

// in the future we will want to pass in events, and figure out how to change events json if
// user changes it
 // check the difference between below and this https://bootsnipp.com/snippets/featured/calendar-design
    // below is taken from selectable.html which is a demo
function createCalendar(){
    Util.one('#calendar').style.setProperty('box-shadow', '0px 0px 21px 2px rgba(0,0,0,0.18)');
        var calendar = $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2018-03-12',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-03-01'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      ]
    });
}
