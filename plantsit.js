



Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready

	"DOMContentLoaded": function() {

      createNavbar();
      Helpers.representPlants(registered_plants);
      createSearchFilter(1);
      $(function () {
          $(".date").datetimepicker({
              format: 'L'
          });
      });
  

    }})
