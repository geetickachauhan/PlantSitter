
class Helpers {

  static representPlants(plant_collection, view_mode){
    for (let plant of plant_collection){

      let status_params = [];
      for (let [key, value] of Object.entries(plant.status))
        status_params.push(value);

      let status = new Status(...status_params);

      let params = [];
      for (let [key, value] of Object.entries(plant)){
        if (key != "status")
          params.push(value);
      }

      params.push(status);

      let plant_instance =  new Plant(...params);
      createPlantTile(plant_instance, view_mode);
    }
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
