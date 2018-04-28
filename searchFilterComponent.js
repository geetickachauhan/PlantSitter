
function createSearchFilter(mode){

	//create the search filter up to the last common point with listeners
	//liseners call sorting/searching/etc. helper functions
    let searchfilter = Util.one('#search_filter_container');

    let inner = `
    <div class="container">
        <div class="row justify-content-md-center">

            <form>
              <div class="form-group margin-top">
                <div class="text-center search-big-font" >Search plants</div>
                <input type="text" class="form-control" id="search_term" placeholder="Search plant name or type" value="">
              </div>

              <hr class="g-divider"/>
              <div class="text-center search-big-font" >Filter By</div>

              <div class="form-group">
                <div class="g-filter" id="healthstatus" data-toggle="collapse" data-target="#health_options">
                    <span class="fas fa-heartbeat fa-lg margin-right text-red"></span>Health Status
                </div>

                <div class="collapse option-container" id="health_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="watering" data-toggle="collapse" data-target="#water_options">
                  <span class="fas fa-tint fa-lg margin-right text-aqua"></span>Watering
                </div>

                <div class="collapse option-container" id="water_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="light" data-toggle="collapse" data-target="#light_options">
                  <span class="fas fa-lightbulb fa-lg margin-right text-yellow"></span>Light
                </div>

                <div class="collapse option-container" id="light_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="extra_care" data-toggle="collapse" data-target="#extra_care_options">
                  <span class="fas fa-syringe fa-lg margin-right "></span>Extra care
                </div>

                <div class="collapse option-container" id="extra_care_options">
                </div>
              </div>

              <div class="form-group">
                <div class="g-filter" id="varying_filters" data-toggle="collapse" data-target="#varying_options">
                </div>

                <div class="collapse option-container" id="varying_options">
                </div>
              </div>

            </form>

        </div>
        <div class="dummy-row">
        </div>

    </div>
    `

    searchfilter.innerHTML = inner;

    healthstatus = Util.one("#health_options");
    addCheckboxes(healthstatus, ["healthy", "sick"], ["Healthy", "Sick"]);

    watering = Util.one('#water_options');
    addCheckboxes(watering, ["everymonth", "every2weeks", "everyweek"], ["Every Month", "Every 2 Weeks", "Every Week"]);

    light = Util.one("#light_options");
    addCheckboxes(light, ["directlight", "indirectlight"], ["Direct Light", "Indirect Light"]);

    extracare = Util.one('#extra_care_options');
    fertilizer = '<span class="fas fa-poo fa-lg margin-right text-brown"></span>Fertilizer';
    pesticide = '<span class="fas fa-bug fa-lg margin-right text-gray"></span>Pesticide';
    trimming = '<span class="fas fa-cut fa-lg margin-right text-black"></span>Trimming';
    addCheckboxes(extracare, ["fertilizer", "pesticide", "trimming"], [fertilizer, pesticide, trimming]);

	if (mode == 0){
        varyingfilter = Util.one('#varying_options');
        varyingfilter.parentElement.children[0].innerHTML = '<span class="fas fa-leaf fa-lg margin-right text-green"></span><span class="fas fa-home fa-lg margin-right text-gray"></span>Plantsitting Status';
        addCheckboxes(varyingfilter, ["athome", "sentforcare", "receivedforcare"], ["At Home", "Sent for Care", "Received for Care"]);
    }
    else{
        // the rest of the volunteer style filter
        varyingfilter = Util.one('#varying_options');
        varyingfilter.parentElement.children[0].innerHTML = '<span class="fas fa-leaf fa-lg margin-right text-green"></span><span class="fas fa-clock fa-lg margin-right text-gray"></span>Care Duration';
        addCheckboxes(varyingfilter, ["1to7days", "8to14days", "15to24days", "22daysandabove"], ["1 to 7 days", "8 to 14 days", "15 to 24 days", "22 days and above"]);
    }
		//the rest of the owner style search filter
//	else
		//the rest of the volunteer style search filter

	//attach it to the container
  addFilterListeners(mode);

}


function addFilterListeners(mode){

    Util.one("#search_term").addEventListener("input", function(e){
      e.stopPropagation();

      let search_term = e.target.value.toLowerCase();

      if (search_term == ""){
        search_set = all_plants.slice();
      }
      else {

        for (let plant_instance of all_plants){
          if (plant_instance.name.toLowerCase().includes(search_term)){
            if (!search_set.includes(plant_instance))
              search_set.push(plant_instance);
            }
          else{
            if (search_set.includes(plant_instance))
                search_set.splice(search_set.indexOf(plant_instance), 1);
            }
        }

      }

      showSelectedItems(search_set, filter_set);

    });




    var filters = {};
    let filter_list = Util.all(".option-container").map(el => el.getAttribute("id"));
    for (let filter of filter_list)
      if (filter != "extra_care_options")
        filters[filter] = null;

    for (let filter of ['fertilizer', 'pesticide', 'trimming'])
      filters[filter] = null;


    Util.all(".form-check-input").map(el => el.addEventListener("click", function(e){

        let checked_status = e.target.checked;

        // groupings of filters with non overlapping subfilters
        let filter_type = e.target.parentElement.parentElement.getAttribute("id");


        let type_all_options = null;

        if (filter_type == "extra_care_options"){
          filter_type = e.target.getAttribute("id");
        }
        else {
          type_all_options = Array.from(e.target.parentElement.parentElement.children).map(el => el.children[0]).filter(x => x.checked);
        }

        let filter_value = e.target.getAttribute("id");

        if (filter_type != e.target.getAttribute("id") && type_all_options.length == 0){
          filters[filter_type] = null;
        }
        else{

          let unchecked_flag = false;

          if (filters[filter_type] == null)
            filters[filter_type] = [];

          //mapping_dict is of the format: {filter_type: filter key in plant instance,
          //[what value of plant instance corresponds to each filter id]
          let mapping_dict = {'health_options': ['health', {'healthy': 1, 'sick': 0} ],
          'light_options': ['light', {'directlight': 1, 'indirectlight': 0}],
          'water_options': ['watering_freq', {'everymonth': 0, 'every2weeks': 1, 'everyweek': 2}],

          'fertilizer': ['fertilizer_freq', {'fertilizer': 1}],
          'pesticide': ['pesticide_freq', {'pesticide': 1}],
          'trimming': ['trimming', {'trimming': 1}],
          }

          if (mode == 0){
            mapping_dict['varying_options'] = ['plantsitting_status', {'athome': 0, 'sentforcare': 1, 'receivedforcare': 2}];
          }

          let plant_value;

          for (let plant_instance of all_plants){

            if (filter_type == 'fertilizer' || filter_type == "pesticide")
              plant_value = plant_instance[mapping_dict[filter_type][0]][0].some(Util.nonzero) ? 1 : 0;
            else if (filter_type == "water_options")
              plant_value = plant_instance[mapping_dict[filter_type][0]][1];
            else if (filter_type == "varying_options"){

              if (mode == 0){
                if (plant_instance.status.status_code == 3){
                  if (plant_instance.status.app_caretaker.id == logged_in_user.id)
                    plant_value = 2; //received for care
                  else
                    plant_value = 1; //sent for care
                }
                else //if the status_code is any of [0,1,2,4] the plant is still at home
                  plant_value = 0;
              }
            }
            else
              plant_value = plant_instance[mapping_dict[filter_type][0]];


            for (let j = 0 ; j < Object.keys(mapping_dict[filter_type][1]).length ; j++){
              if (filter_value == Object.keys(mapping_dict[filter_type][1])[j] )
                {

                  if (plant_value == Object.entries(mapping_dict[filter_type][1])[j][1]){

                    if (checked_status){
                      if (!filters[filter_type].includes(plant_instance))
                        filters[filter_type].push(plant_instance);
                    }
                    else{ //if the checkbox was just unchecked
                      if (filters[filter_type].includes(plant_instance))
                        filters[filter_type].splice(filters[filter_type].indexOf(plant_instance), 1);

                      unchecked_flag = true;

                    }
                  }
                }
            }

          }
          if (unchecked_flag && Object.keys(mapping_dict[filter_type][1]).length == 1)
            filters[filter_type] =  null;
        }



        let valid_filters = [];

        for (let [key, value] of Object.entries(filters))
          if (value != null)
            valid_filters.push(new Set(value));

        if (valid_filters.length)
          filter_set = Array.from(Util.intersectB(...valid_filters));
        else
          filter_set = all_plants.slice();

        showSelectedItems(search_set, filter_set)

    }));
}



function showSelectedItems(search_set, filter_set){

  let shown_set;

  shown_set =  new Set([...new Set(search_set)].filter(x => new Set(filter_set).has(x)));

  shown_set = Array.from(shown_set)

  let container = Util.one("#board_container");
  let num_tiles = Array.from(container.children).length;

  for (let i = 0 ; i < num_tiles ; i++){
    container.removeChild(container.children[0]);
  }

  shown_set.sort((a, b) => a.name.localeCompare(b.name));

  for (let plant_instance of shown_set)
    createPlantTile(plant_instance);

}


function deleteSearchFilter(){
	//TODO: either a separate delete for each component or a universal helper delete function that accepts a criterion
    searchfilter = Util.one('#SearchFilter');
    Util.removeAllChildren(searchfilter);
    if(searchfilter != null){
    searchfilter.parentNode.removeChild(searchfilter);}
}

function addCheckboxes(elt, ids, labels){

//<div class="form-check g-indent">
//    <input class="form-check-input" type="checkbox" value="healthy" id="healthy">
//    <label class="form-check-label" for="healthy">
//    Healthy
//    </label>
//</div>
//<div class="form-check g-indent">
//    <input class="form-check-input" type="checkbox" value="sick" id="sick">
//    <label class="form-check-label" for="sick">
//    Sick
//    </label>
//</div>


    for(i=0; i< ids.length; i++){
        var checkbox = Util.create("div");
        checkbox.classList.add("form-check", "g-indent");
        var input = Util.create("input", {"type":"checkbox", "value": ids[i], "id": ids[i]});
        input.classList.add("form-check-input");
        var label = Util.create("label", {"for": ids[i]});
        label.classList.add("form-check-label");
        label.innerHTML = labels[i];
        checkbox.appendChild(input);
        checkbox.appendChild(label);
        elt.appendChild(checkbox);
    }

}
//<div id="SearchFilter">
//        <div class="g-center search-big-font">Search Plants</div>
//        <div class="input-group">
//            <input type="text" class="form-control" placeholder="Search name or type" aria-label="Search name or type" id="searchplants">
//            <div class="input-group-append">
//                <button class="btn btn-outline-secondary" type="button"><span class="fas fa-search"></span></button>
//            </div>
//        </div>
//        <hr class="g-divider"/>
//        <div class="g-center search-big-font">Filter By</div>
//        <div class="g-filter" id="healthstatus">
//            <span class="fas fa-heartbeat fa-lg margin-right text-red"></span>Health Status
//        </div>
//        <div class="g-filter" id="watering">
//            <span class="fas fa-tint fa-lg margin-right text-aqua"></span>Watering
//        </div>
//        <div class="g-filter" id="light">
//            <span class="fas fa-lightbulb fa-lg margin-right text-yellow"></span>Light
//        </div>
//        <div class="g-filter" id="extracare">
//            Extra Care
//        </div>
//        <div class="g-filter" id="varying-filter">
//        </div>
//    </div>
