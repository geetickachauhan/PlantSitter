
function setupPlantManipulation(){

  let plant_functions = Util.all(".plant-function");

  plant_functions[0].addEventListener("click", function(){ //add plant
    $('#collapseFunctionForm').collapse('hide');

    //TODO: show the overlay
    //read input values
    //create plant instance and possibly store it in storage memory
    //createPlantTile(plant_instance);
  });

  var start_date, end_date;

  /*
  For enabling and disabling the confirm button depending on whether the date fields
  have received input
  */
  $(function () {
    $(".date").on("change.datetimepicker", function(e){

      let id = e.target.tagName == "INPUT"? e.target.getAttribute("data-target").substring(1): e.target.getAttribute("id");
      let value = e.target.tagName == "INPUT"? e.target.value: e.target.children[0].value;

      if ( id == "start_date_picker"){
        start_date = value;
      }
      else if (id == "end_date_picker"){
        end_date = value;
      }

      if (start_date && end_date)
        Util.one("#temp_care_confirm").removeAttribute("disabled");
      else
        Util.one("#temp_care_confirm").setAttribute("disabled", "true");
    })
  });


  Util.one("#temp_care_confirm").addEventListener("click", function(e){
    e.preventDefault();

    for (let plant of checked_plants){
      plant.requestForCare(start_date, end_date);
      updateStatus(Util.one("#plant_tile_" + plant.id), plant);
    }

    $('#collapseFunctionForm').collapse('hide');

  });


  Util.one("#adoption_button").addEventListener("click", function(e){

    $('#collapseFunctionForm').collapse('hide');
    for (let plant of checked_plants){
        plant.requestForAdoption();
        updateStatus(Util.one("#plant_tile_" + plant.id), plant);
    }

  });


	//generates the 3 buttons along with listeners
	//one of the listeners checks for checked checkboxes and expands if there are any to reveal more info along
	//with a new button that has its own listener. If there is no checked checkboxes the two care buttons are disabled
	//(add plant is always enabled)
	//appends it to the container
}
