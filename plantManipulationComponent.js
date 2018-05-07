
function setupPlantManipulation(){

  let plant_functions = Util.all(".plant-function");

  plant_functions[0].addEventListener("click", function(){ //add plant
    $('#collapseFunctionForm').collapse('hide');

    createAddPlantOverlay();

    Util.one("#save button").addEventListener('click', function(e){

      let frequency_input_weekdays = [];
      Util.all(".weekDays-selector").map(el => frequency_input_weekdays.push(Array.from(el.children)
      .filter(x => x.tagName == "INPUT").map(y => {if (y.checked) return 1; else return 0;})));

      let radios = Util.all("#overlay .form-check-input");

      let frequency_radios = radios.slice(0,3);
      frequency_radios.push(...radios.slice(5,8));
      frequency_radios.push(...radios.slice(10,13))

      let bool_radios = radios.slice(3,5);
      bool_radios.push(...radios.slice(8,10));
      bool_radios.push(...radios.slice(13,15));


      let frequencies = [], booleans = [];

      for (let i = 0 ; i < 3 ; i++)
        for (let j = i * 3 ; j < i * 3 + 3 ; j++)
          if (frequency_radios[j].checked)
            frequencies.push(2- (j - i*3));

      for (let i = 0 ; i < 3 ; i++)
        for (let j = i * 2 ; j < i * 2 + 2 ; j++)
          if (bool_radios[j].checked)
            booleans.push(1 - (j - i*2));

      let plant_name = Util.one("#name").value;
      let plant_type = Util.one("#type").value;

      let aggregate_frequencies = [];
      for (let i = 0 ; i < 3 ; i++){
        aggregate_frequencies.push([frequency_input_weekdays[i], frequencies[i]]);
      }

      let plant_args = ["", plant_name, plant_type];
      plant_args = plant_args.concat(aggregate_frequencies);
      plant_args = plant_args.concat(booleans);
      plant_args.push(Util.one("#special-instructions").value);


      let plant_instance = new Plant(...plant_args);

      let registered_plants = JSON.parse(localStorage.getItem('registered_plants'));
      registered_plants.push(plant_instance);
      localStorage.setItem('registered_plants', JSON.stringify(registered_plants));

      removeAddPlantOverlay();
      createPlantTile(plant_instance);

    });
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
    checked_plants.length = 0;
    Util.all(".plant-function").slice(1).map(el => el.setAttribute("disabled", "true"));
  });


  Util.one("#adoption_button").addEventListener("click", function(e){

    $('#collapseFunctionForm').collapse('hide');
    for (let plant of checked_plants){
        plant.requestForAdoption();
        //requestForAdoption.call(plant);
        updateStatus(Util.one("#plant_tile_" + plant.id), plant);
    }

    checked_plants.length = 0;
    Util.all(".plant-function").slice(1).map(el => el.setAttribute("disabled", "true"));

  });


	//generates the 3 buttons along with listeners
	//one of the listeners checks for checked checkboxes and expands if there are any to reveal more info along
	//with a new button that has its own listener. If there is no checked checkboxes the two care buttons are disabled
	//(add plant is always enabled)
	//appends it to the container
}
