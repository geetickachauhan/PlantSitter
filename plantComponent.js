//view of the plant logic
DEFAULT_PHOTO_URL = "./images/plant_photoholder.png"

var checked_plants = [];

function createUserDisplayStatus(plant_instance, footer){
  let text = document.createElement("p");
  let status_code = plant_instance.status.status_code;

  let extra;

  if ( status_code == 0){
    text.innerText = "Currently at home";

    extra = document.createElement("div");
    extra.classList.add("input-group-text", "aggregation-checkbox");

    let checkbox = Util.create("input", {"type": "checkbox", "aria-label": "Checkbox for selecting this plant card"});

    checkbox.addEventListener('change', function(e){

      if (this.checked){
        checked_plants.push(plant_instance);
        Util.all(".plant-function").slice(1).map(el => el.removeAttribute("disabled"));

      }
      else{ //if the checkbox just got unchecked
        checked_plants.splice(checked_plants.indexOf(plant_instance), 1);

        if (!checked_plants.length) {
          Util.all(".plant-function").slice(1).map(el => el.setAttribute("disabled", "true"));
          $('#collapseFunctionForm').collapse('hide');
          }
      }
    });

    extra.appendChild(checkbox);
  }
  else if (status_code == 1){
    text.innerText = "Requested plantsitting from " + plant_instance.status.start_date +
    "\xa0 to \xa0" + plant_instance.status.end_date;

    extra = Helpers.createCancelButton(plant_instance, plant_instance.cancelRequestForcare);
  }
  else if (status_code == 2){

    text.innerText = "Claimed for plantsitting by " + plant_instance.status.app_caretaker.firstName +
    ". Not yet in their care.";

    extra = Util.create("div");
    extra.appendChild(Helpers.createCheckButton("Picked up?", plant_instance, plant_instance.transitionDone))
    extra.appendChild(Helpers.createCancelButton(plant_instance, plant_instance.cancelCareReqApproval));

  }
  else if (status_code == 3){
    text.innerText = "Sent for plantsitting from " + plant_instance.status.start_date +
    "\xa0 to \xa0" + plant_instance.status.end_date;

    extra = Util.create("button")
    extra.classList.add("btn", "btn-dark", "req-photo");
    extra.innerText = "Request photo";
  }
  else { //if status_code == 4
    text.innerText = "Offered for adoption";
    extra = Helpers.createCancelButton(plant_instance, plant_instance.cancelRequestForAdoption);
  }

  footer.appendChild(text);
  footer.appendChild(extra);

  return footer;
}

/*
creates icons based on plant properties
*/
function createIcons(plant_instance){
  let container = Util.create("div");
  let health, light, trimming;

  if (plant_instance.health)
    health = Helpers.createIcon("heartbeat",'icon-group', 'text-red');
  else
    health = Helpers.createIcon("heartbeat",'icon-group', 'gray', 'transparent');

  container.appendChild(health);

  water_container = Util.create("span");
  for (let i = 0 ; i < plant_instance.watering_freq[1] + 1; i++){
      water_container.appendChild(Helpers.createIcon("tint", "text-aqua"));
  }
  water_container.classList.add("icon-group");
  container.appendChild(water_container);

  if (plant_instance.light)
    light = Helpers.createIcon("sun", 'icon-group', "gold");
  else
    light = Helpers.createIcon("sun", 'icon-group', 'transparent');

  container.appendChild(light);

  fertilizer_container = Util.create("span");
  for (let i = 0 ; i < plant_instance.fertilizer_freq[1]+ 1; i++){
      fertilizer_container.appendChild(Helpers.createIcon("poo", 'text-brown'));
  }
  fertilizer_container.classList.add("icon-group");
  container.appendChild(fertilizer_container);

  if (plant_instance.pesticide_freq[1])
    container.appendChild(Helpers.createIcon("bug", 'icon-group', 'text-gray'));

  if (plant_instance.trimming)
    container.appendChild(Helpers.createIcon("cut", "icon-group"))

  return container;
}



function createPlantTile(plant_instance){

  let card = Util.create("div", {"id": "plant_tile_" + plant_instance.id});
  card.classList.add("card");

  let header = Util.create("div");
  header.classList.add("card-header");
  header.innerText = "Owned by ";

  let profile_link = Util.create("a", {"href": "#"});
  profile_link.classList.add("green-link");

  if (plant_instance.owner == logged_in_user.id){
      profile_link.innerText = "me";
      profile_link.setAttribute("href", "profile.html")
  }
  else
      profile_link.innerText = logged_in_user.firstName + " " +
      logged_in_user.lastName;

  header.appendChild(profile_link);

  card.appendChild(header);

  let top_img = Util.create("img");
  top_img.classList.add("card-img-top");

  if (plant_instance.photo_url)
    top_img.setAttribute("src", plant_instance.photo_url);
  else{
    top_img.setAttribute("src", DEFAULT_PHOTO_URL)
    //top_img.classList.add("transparent");
  }

  card.appendChild(top_img);

  let card_body = Util.create("div");
  card_body.classList.add("card-body");

  let title = Util.create("h5");
  title.classList.add("card-title");
  title.innerText = plant_instance.name? plant_instance.name : "";

  let text = Util.create("p");
  text.classList.add("card-text");
  text.innerText = plant_instance.type;

  let icons = createIcons(plant_instance);

  card_body.appendChild(title);
  card_body.appendChild(text);
  card_body.appendChild(icons);

  card.appendChild(card_body);

  updateStatus(card, plant_instance);

  Util.one("#board_container").appendChild(card);

}


/*
  given a plant card and the corresponding plant instance, updates the status section of the plant card
  -- used both for creating initial status and when the status changes
*/
function updateStatus(plant_card, plant) {

  let old_footer = Array.from(plant_card.childNodes).filter(child => child.classList.contains("card-footer"))[0];
  if (old_footer)
    plant_card.removeChild(old_footer);

  let footer = Util.create("div");
  footer.classList.add("card-footer", "text-muted");

  let status_info;
  if (plant.owner == logged_in_user.id)
      status_info = createUserDisplayStatus(plant, footer);
  else
      status_info = console.log("heeey"); //TODO: implement how status is displayed to a non owner user

  plant_card.appendChild(status_info);

}
