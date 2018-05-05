
var logged_in_user = JSON.parse(localStorage.getItem('logged_in_user'));
let registered_plants = Helpers.createPlantInstances(JSON.parse(localStorage.getItem('registered_plants')));

var user_registered_plants = registered_plants.filter(plant => plant.owner == logged_in_user.id).sort((a, b) => a.name.localeCompare(b.name));
var all_plants = user_registered_plants.slice();


Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function() {

      createNavbar();

      Helpers.representPlants(user_registered_plants, 0);
      createSearchFilter(0);

      $(function () {
          $(".date").datetimepicker({
              format: 'L'
          });
      });

      setupPlantManipulation();

    }})
