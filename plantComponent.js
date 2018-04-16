//view of the plant logic
DEFAULT_PHOTO_URL = "./images/plant_photoholder.png"

function createStatus(plant_instance, footer){
  let text = document.createElement("p");
  let status_code = plant_instance.status.status_code;

  let extra;

  if ( status_code == 0){
    text.innerText = "Currently at home";

    extra = document.createElement("div");
    extra.classList.add("input-group-text", "aggregation-checkbox");

    let checkbox = Util.create("input", {"type": "checkbox", "aria-label": "Checkbox for selecting this plant card"});
    extra.appendChild(checkbox);
  }
  else if (status_code == 1){
    text.innerText = "Requested plantsitting from " + plant_instance.status.start_date +
    " to " + plant_instance.status.end_date;

    extra = Helpers.createCancelButton();
  }
  else if (status_code == 2){
    text.innerText = "Claimed for plantsitting by " + plant_instance.status.app_caretaker +
    ". Not yet in their care.";

    extra = Util.create("div");
    extra.appendChild(Helpers.createCheckButton("Picked up?"))
    extra.appendChild(Helpers.createCancelButton());

  }

  else{ //if status_code == 3
    text.innerText = "Sent for plantsitting from " + plant_instance.status.start_date +
    " to " + plant_instance.status.end_date;

    extra = Util.create("button")
    extra.classList.add("btn", "btn-dark", "req-photo");
    extra.innerText = "Request photo";
  }

  footer.appendChild(text);
  footer.appendChild(extra);

  return footer;
}


function createIcons(plant_instance){
  let container = Util.create("div");
  let health, light, trimming;

  if (plant_instance.health)
    health = Helpers.createIcon("heartbeat",'icon-group', 'green');
  else
    health = Helpers.createIcon("heartbeat",'icon-group', 'grey', 'transparent');

  container.appendChild(health);

  water_container = Util.create("span");
  for (let i = 0 ; i < plant_instance.watering_freq[1] + 1; i++){
      water_container.appendChild(Helpers.createIcon("tint", "blue"));
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
      fertilizer_container.appendChild(Helpers.createIcon("poo", 'brown'));
  }
  fertilizer_container.classList.add("icon-group");
  container.appendChild(fertilizer_container);

  if (plant_instance.pesticide_freq[1])
    container.appendChild(Helpers.createIcon("bug", 'icon-group'));

  if (plant_instance.trimming)
    container.appendChild(Helpers.createIcon("cut", "icon-group"))

  return container;
}


function createPlantTile(plant_instance, container_id){

  let card = document.createElement("div");
  card.classList.add("card");

  let header = document.createElement("div");
  header.classList.add("card-header");
  header.innerText = "Owned by ";

  let profile_link = Util.create("a", {"href": "#"});
  profile_link.innerText = logged_in_user.firstName + " " +
  logged_in_user.lastName;

  header.appendChild(profile_link);

  card.appendChild(header);

  let top_img = document.createElement("img");
  top_img.classList.add("card-img-top");

  if (plant_instance.photo_url)
    top_img.setAttribute("src", plant_instance.photo_url);
  else{
    top_img.setAttribute("src", DEFAULT_PHOTO_URL)
    //top_img.classList.add("transparent");
  }

  card.appendChild(top_img);

  let card_body = document.createElement("div");
  card_body.classList.add("card-body");

  let title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = plant_instance.name? plant_instance.name : "";

  let text = document.createElement("p");
  text.classList.add("card-text");
  text.innerText = plant_instance.type;

  let icons = createIcons(plant_instance);

  card_body.appendChild(title);
  card_body.appendChild(text);
  card_body.appendChild(icons);

  card.appendChild(card_body);

  let footer = document.createElement("div");
  footer.classList.add("card-footer", "text-muted");

  let status_footer = createStatus(plant_instance, footer);

  card.appendChild(status_footer);

  Util.one("#board_container").appendChild(card);

	//create the tile based on plant properties
}

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function() {

      createPlantTile(Sauron);
      createPlantTile(Balrog)
    }})
