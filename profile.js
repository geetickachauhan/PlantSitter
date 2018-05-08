//listeners for profile.js buttons and inputs
//dynamically loads the content of profile
var fnvalid = true, lnvalid = true, phonevalid = true, emailvalid = true;

var logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));

$(document).ready(function(){
    //    showProfile(own, photo, star, name, phone, email, description);
    // in the future, this won't be under document.ready. It will basically be called by whichever page leads to this profile page because they need to pass in registered user and the flag stating whether they are looking at their own profile
    createNavbar();
    let mode; // if mode is 0, you are looking at someone else's profile and shouldn't be able to edit
    let user;

    if (Util.getURLParam("id") == logged_in_user.id){
      mode = 1;
      user = logged_in_user;
    }
    else{
      mode = 0;
      user = registered_users.filter(user => user.id == Util.getURLParam("id"))[0];
    }

    showProfile(mode, user);


});

function showProfile(own, user){
    // own is a flag that if set to 1, displays calendar, edit and add event to calendar
    updateProfileView(user);
    if(own == 1){
        var edit_elt = Util.one('#edit');
        edit_enable(edit_elt);
        createCalendar();
    }

}

function updateProfileView(user){
    Util.one('#photo').innerHTML = "<img src='"+user['photo_url']+"'>";
    createStars(user['star']);
    Util.one('#name').innerHTML = user['firstName'] + " " + user["lastName"];
    Util.one('#phone').innerHTML = user['phone'];
    Util.one('#email').innerHTML = user['email'];
    Util.one('#description').innerHTML = user['description'];
}
// adds the click events etc to make editing work
function edit_enable(edit_elt){
    var editbutton = '<button class="btn btn-light" id="edit-button"><span class="fas fa-pencil-alt fa-2x"></span></button>'
    edit_elt.innerHTML = editbutton;
    savebutton = Util.create('button', {'id': 'save-button'});
    savebutton.classList.add('btn', 'btn-info', 'g-display-none', 'float-right');
    savebutton.innerHTML = "Save";
    edit_elt.appendChild(savebutton);

    // add click event listener for the edit button
    // then instead of edit show it as save and when save is pressed update the json
    Util.one('#edit-button').addEventListener('click', function(){
        Util.one('#name').innerHTML = `
        <div class="row">
            <div class="col-sm-6 form-group">
                <input type="text" class="form-control" id="firstName-input" required oninput="Util.checkPattern(this, '^[A-z]+$', 'e-firstName', 'fnvalid')">
                <div class="invalid-feedback g-small-text" id="e-firstName">Please enter only alphabets</div>
            </div>
            <div class="col-sm-6 form-group">
                <input type="text" class="form-control" id="lastName-input" required oninput="Util.checkPattern(this, '^[A-z ]+$', 'e-lastName', 'lnvalid')">
                <div class="invalid-feedback g-small-text" id='e-lastName'>Alphabets only</div>
            </div>
        </div>`;

        phone = Util.one('#phone');
        phone.classList.add("form-group");
        phone.innerHTML = `<input type="number" class="form-control small-input" id="phone-input" required oninput="Util.checkPattern(this, '^[0-9]{10}$', 'e-phone', 'phonevalid')">
                            <div class="invalid-feedback" id="e-phone">Please enter a valid phone number</div>`;

        email = Util.one('#email');
        email.classList.add("form-group");
        email.innerHTML = `<input type="email" class="form-control small-input" id="email-input" required oninput="Util.checkPattern(this, '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$', 'e-email', 'emailvalid')">
                            <div class="invalid-feedback" id="e-email">Enter a valid email!</div>`;
        Util.one('#description').innerHTML = '<textarea class="form-control small-input" id="description-input" rows="2"></textarea>';
        Util.one('#photo').innerHTML =
           `<label class="btn btn-info g-big-button label-center">
                <span class="fas fa-camera fa-5x"></span>
                <input type="file" hidden>
            </label>`;

        Util.one('#firstName-input').value = logged_in_user['firstName'];
        Util.one('#lastName-input').value = logged_in_user['lastName'];
        Util.one('#phone-input').value = logged_in_user['phone'];
        Util.one('#email-input').value = logged_in_user['email'];
        Util.one('#description-input').value = logged_in_user['description'];
        Util.one('#edit-button').classList.add('g-display-none');
        Util.one('#save-button').classList.remove('g-display-none');

        //disables save button upon entering invalid input
        [Util.one('#firstName-input'), Util.one('#lastName-input'), Util.one('#phone-input'), Util.one('#email-input') ].map(el => el.addEventListener("input", function(e){

          if(!fnvalid || !lnvalid || !phonevalid || !emailvalid)
            Util.one("#save-button").setAttribute("disabled", "true");
          else
            Util.one("#save-button").removeAttribute("disabled");
        }))

    });

    Util.one('#save-button').addEventListener('click', function(){
            // find a way to edit the json based on logged in user
        if(fnvalid == false || lnvalid == false || phonevalid == false || emailvalid == false){
            console.log("one of the inputs was not valid");
            return;
        }
        logged_in_user['firstName'] = Util.one('#firstName-input').value;
        logged_in_user['lastName'] = Util.one('#lastName-input').value;
        logged_in_user['phone'] = Util.one('#phone-input').value;
        logged_in_user['email'] = Util.one('#email-input').value;
        logged_in_user['description'] = Util.one('#description-input').value;


        localStorage.setItem('logged_in_user', JSON.stringify(logged_in_user));

        //update the database of users
        registered_users[registered_users.findIndex(x => x.id == logged_in_user.id)] = logged_in_user;
        localStorage.setItem('registered_users', JSON.stringify(registered_users));


        // basically the user will have different stuff during the session but no database changes
        // have been made
        updateProfileView(logged_in_user);
        Util.one('#save-button').classList.add('g-display-none');
        Util.one('#edit-button').classList.remove('g-display-none');
    });
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
          title: 'Long plant event',
          start: '2018-03-07',
          end: '2018-03-10'
        },
        {
          id: 999,
          title: 'Repeating watering event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Sauron Care day',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting with Theoden',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch for Sauron',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting with Beren',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Beren Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner for Rosie',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Balrog Fertilizer Party',
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
