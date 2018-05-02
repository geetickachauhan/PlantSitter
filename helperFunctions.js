
class Helpers {


  static updatePlantStorage(plant_instance){
    let registered_plants = JSON.parse(sessionStorage.getItem('registered_plants'));
    registered_plants[registered_plants.findIndex(x => x.id == plant_instance.id)] = plant_instance;
    sessionStorage.setItem('registered_plants', JSON.stringify(registered_plants));
  }


  static subtractDates(start, end){

    let start_date = new Date(start.slice(6), start.slice(0,2), start.slice(3,5) );
    let end_date = new Date(end.slice(6), end.slice(0,2), end.slice(3,5) );
    return (end_date - start_date)/(24 * 60 * 60 * 1000 );

  }


  static createPlantInstances(plant_collection){
    let plant_instances = [];

    for (let plant of plant_collection){

      let status_params = [plant.status.status_code, plant.status.start_date, plant.status.end_date,
      plant.status.req_caretakers, plant.status.app_caretaker];

      //let status = new Status(...status_params);

      let params = [plant.photo_url, plant.name, plant.type, plant.watering_freq, plant.fertilizer_freq, plant.pesticide_freq,
      plant.health, plant.light, plant.trimming, plant.instructions];

      if (typeof plant.id !== 'undefined'){
        params.push(plant.id);
        params.push(plant.owner);
      }
      params.push(status_params);

      let new_instance = new Plant(...params)

      plant_instances.push(new_instance);

    }
    return plant_instances;

  }


  static representPlants(plant_instances, view_mode){

    for (let plant of plant_instances)
      createPlantTile(plant, view_mode );
  }


  static createRequestToCare(plant, action){
    let button = Util.create("button", {"type": "button"});
    button.classList.add("btn", "btn-success");
    button.innerText = "Request to care";

    button.addEventListener("click", function(e){
      e.stopPropagation();
      action.call(plant);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant, 1);

    });

    return button;
  };



  static createCancelButton(plant, action, view_mode, text){
    let button = Util.create("button", {"type": "button"});
    button.classList.add("btn", "btn-secondary", "cancel");

    if (text === undefined)
      button.innerText = "Cancel";
    else
      button.innerText = text;

    button.addEventListener("click", function(e){
      e.stopPropagation();
      action.call(plant);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant, view_mode);


    });

    return button;
  };


  static createIcon(type, ...args){
    let i = Util.create("i");
    i.classList.add("fas","fa-lg", "fa-" + type);

    for (let arg of args)
      i.classList.add(arg);

    return i;
  }


  static createCheckButton(label, plant, action){
    let button_gr = Util.create("label");
    button_gr.classList.add("approve")
    button_gr.innerText = label;
    let button = Util.create("button", {"type": "button"});
    button.classList.add("btn", "btn-success",  "check-margin-left");

    button.appendChild(Helpers.createIcon("check"));
    button_gr.appendChild(button)

    button.addEventListener("click", function(e){
      e.stopPropagation();
      action.call(plant);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant, 0);

    });

    return button_gr;
  }
  //static searchplants (according to a bunch of criteria){
  	//access plants (logic)
  	//search the ones that satisfy the criteria and return them as the desired plants
  	//list all plant tile ids
  	//delete the plant tiles with ids not existiing in the returned desired plants list
  //}
}
