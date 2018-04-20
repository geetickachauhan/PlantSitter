//$(document).ready(function(){
//    createNavbar();
//    createSearchFilter(0);
//
//});
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
                <input type="text" class="form-control" id="search_term" placeholder="Search plant name or type">
              </div>

              <hr class="g-divider"/>
              <div class="text-center search-big-font" >Filter By</div>

              <div class="form-group">
                <div class="g-filter" id="healthstatus" data-toggle="collapse" data-target="#health_options">
                    <span class="fas fa-heartbeat fa-lg margin-right text-red"></span>Health Status
                </div>

                <div class="collapse" id="health_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="watering" data-toggle="collapse" data-target="#water_options">
                  <span class="fas fa-tint fa-lg margin-right text-aqua"></span>Watering
                </div>

                <div class="collapse" id="water_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="light" data-toggle="collapse" data-target="#light_options">
                  <span class="fas fa-lightbulb fa-lg margin-right text-yellow"></span>Light
                </div>

                <div class="collapse" id="light_options">
                </div>
              </div>


              <div class="form-group">
                <div class="g-filter" id="light" data-toggle="collapse" data-target="#extra_care_options">
                  <span class="fas fa-syringe fa-lg margin-right "></span>Extra care
                </div>

                <div class="collapse" id="extra_care_options">
                </div>
              </div>

              <div class="form-group">
                <div class="g-filter" id="light" data-toggle="collapse" data-target="#varying_options">
                </div>

                <div class="collapse" id="varying_options">
                </div>
              </div>

            </form>

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
