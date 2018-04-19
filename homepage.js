
var user_registered_plants = registered_plants.filter(plant => plant.owner == logged_in_user.id);

function representUserPlants(){
  for (let user_plant of user_registered_plants){

    let status_params = [];
    for (let [key, value] of Object.entries(user_plant.status))
      status_params.push(value);

    let status = new Status(...status_params);

    let params = [];
    for (let [key, value] of Object.entries(user_plant)){
      if (key != "status")
        params.push(value);
    }

    params.push(status);

    let plant_instance =  new Plant(...params);
    createPlantTile(plant_instance);
  }
}

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function() {

      createNavbar();
      representUserPlants();
      createSearchFilter(0);
      $(function () {
          $(".date").datetimepicker({
              format: 'L'
          });
      });
      setupPlantManipulation();

    }})
