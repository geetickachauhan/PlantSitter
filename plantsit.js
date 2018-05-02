
let registered_plants = Helpers.createPlantInstances(JSON.parse(sessionStorage.getItem('registered_plants')));

var shown_plants = registered_plants.filter(plant => plant.status.status_code == 1).sort((a, b) => a.name.localeCompare(b.name));
var all_plants = shown_plants.slice();

Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function() {

      createNavbar();
			console.log("shown plants are", shown_plants)
      Helpers.representPlants(shown_plants, 1);
      createSearchFilter(1);
      $(function () {
          $(".date").datetimepicker({
              format: 'L'
          });
      });


    }})
