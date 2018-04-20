
class Helpers {

  static createCancelButton(plant, action){
    let button = Util.create("button", {"type": "button"});
    button.classList.add("btn", "btn-secondary", "cancel");
    button.innerText = "Cancel";

    button.addEventListener("click", function(){
      action.call(plant);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant);

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

    button.addEventListener("click", function(){
      action.call(plant);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant);

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
