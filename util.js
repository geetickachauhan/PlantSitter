

 class Util{



   static nonzero (element){
     return element != 0;
   }

   /*
   https://stackoverflow.com/questions/42604185/get-the-intersection-of-n-arrays
   */
   static intersectB(firstSet, ...sets) {
       // function to intercept two sets
       var intersect = (a,b) => {
           return new Set([...a].filter(item => b.has(item)))
       };

       // iterate all sets comparing the first set to each.
       sets.forEach(sItem => firstSet = intersect(firstSet, sItem));

       // return the result.
       return firstSet;
   }


   /**
    * Get one element by selector
    * @param selector {String}
    * @returns {Element}
    */
   static one(selector) {
     return document.querySelector(selector);
   }

   /**
    * Get all elements that match a selector as an array
    * @param selector {String}
    * @returns {Array<Element>}
    */
   static all(selector) {
     return Array.from(document.querySelectorAll(selector));
   }

   /**
	 * Create an element and set a bunch of attributes on it
	 * @param tag {String}
	 * @param attributes {Object}
	 * @returns {Element}
	 */
	static create(tag, attributes) {
		var element = document.createElement(tag);

		for (var name in attributes) {
			element.setAttribute(name, attributes[name]);
		}

		return element;
	}

   /**
  * Set multiple event listeners on an element
  */
 static events(target, events, callback) {
   if (callback) {
     events.split(/\s+/).forEach(name => target.addEventListener(name, callback));
   }
   else { // Multiple events and callbacks
     for (var name in events) {
       Util.events(target, name, events[name]);
     }
   }
 }


   /*
  Remove all children of an element
  */
  static removeAllChildren(elt) {
      if(elt == null){
          return;
      }
    while (elt.hasChildNodes()) {
      Util.clear(elt.firstChild);
    }
  }

  /*
  helper method to clear first child recursively
  */
  static clear(elt) {
    while (elt.hasChildNodes()) {
      Util.clear(elt.firstChild);
    }
    elt.parentNode.removeChild(elt);
  }


  /**
 * Get a parameter from the URL query string
 * @param name {String}
 */
static getURLParam(name) {
  return new URL(location).searchParams.get(name);
}


/*
check pattern for an input type text
*/
static checkPattern(input, pattern, errormessageid, variable){
    //console.log("checking!");

    var regex = new RegExp(pattern);
    if(!!regex.test(input.value) == false){
        input.style.setProperty('border-color',  'var(--red)');
        Util.one('#'+errormessageid).style.setProperty('display', 'inline');
        //console.log("invalid");
        window[variable] = false;
    }
    else{
        input.style.setProperty('border',  '1px solid #ced4da');
        Util.one('#'+errormessageid).style.setProperty('display', 'none');
        window[variable] = true;
        //console.log("valid");
    }
}

 /*
a function to create the weekday selectors in the overlay and plant profile
The last parameter is a boolean flag for whether validation is necessary for the weekday selectors
*/
static addWeekdaySelector(elt, id, variable, checkunselected=false){
    // pass in variable as a string - it'll be wateringvalid etc depending on what element is being looked at
    var selector = document.createElement("div");
    selector.classList.add("weekDays-selector");
    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var labels = ["M", "T", "W", "T", "F", "S", "S"];
    for(i=0; i<weekdays.length; i++){
        if(checkunselected == true){
            var input = Util.create("input", {'type': 'checkbox', 'id': "weekday-"+weekdays[i] + id, 'onclick': 'Util.showErrorMessageWeekdayCheckboxes("' + id + '", "e-'+id + '", "'+variable+'")'});
        }
        else{
           var input = Util.create("input", {'type': 'checkbox', 'id': "weekday-"+weekdays[i] + id});
        }
        input.classList.add("weekday");
        input.setAttribute("class", "weekday");
        selector.appendChild(input);
        var label = document.createElement("label");
        label.setAttribute("for", "weekday-"+weekdays[i] + id);
        label.innerHTML = labels[i];
        selector.appendChild(label);
    }
    elt.appendChild(selector);
    var errormessage = Util.create("div", {'id': "e-"+id});
    errormessage.classList.add("invalid-feedback");
    errormessage.innerHTML = "Please select at least one checkbox above";
    elt.appendChild(errormessage);
}

/*
 present error message if no checkboxes are checked
*/
static showErrorMessageWeekdayCheckboxes(id, errormessageid, variable){
    // TODO: check for all checkboxes, if all of them have the value 0, then show the error message
    // if all of them are unchecked then you should set the variable as false and then show the error message
    // this is technically only relevant if the checkbox is unchecked
//    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
//    var nonechecked = true; // we are going to assume at first that none are checked and then it'll be proven wrong by the first checked checkbox
//    for(i=0; i <weekdays.length; i++){
//        var input = Util.one('#weekday-'+weekdays[i] + id);
//        if(input.checked == true){
//            nonechecked = false;
//            break;
//        }
//    }
    var nonechecked = Util.checkUnselectedWeekdayCheckboxes(id);
    if(nonechecked == true){
        // set that variable to false because the variable is no longer valid
        window[variable] = false;
        Util.one('#' + errormessageid).style.setProperty('display', 'inline');
    }
    else{
        window[variable] = true;
        Util.one('#' + errormessageid).style.setProperty('display', 'none');
    }

}

static checkUnselectedWeekdayCheckboxes(id){
    var weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var nonechecked = true; // we are going to assume at first that none are checked and then it'll be proven wrong by the first checked checkbox
    for(i=0; i <weekdays.length; i++){
        var input = Util.one('#weekday-'+weekdays[i] + id);
        if(input.checked == true){
            nonechecked = false;
            break;
        }
    }
    return nonechecked;
}
/*
util method to add radio buttons
*/
static addRadioButtons(elt, name, values, labels){
//    <div class="radio">
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="everyweek" checked>Every Week
//                    </label>
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="every2weeks">Every 2 Weeks
//                    </label>
//                    <label>
//                        <input class="formradio" type="radio" name="water" value="everymonth">Every Month
//                    </label>
//                </div>
    // for above, values = ["everyweek", "every2weeks", "everymonth"] and labels = ["Every Week" ...]

//  <div class="form-check">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
//  <label class="form-check-label" for="exampleRadios1">
//    Default radio
//  </label>
//</div>
//<div class="form-check">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
//  <label class="form-check-label" for="exampleRadios2">
//    Second default radio
//  </label>
//</div>
//<div class="form-check disabled">
//  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
//  <label class="form-check-label" for="exampleRadios3">
//    Disabled radio
//  </label>
//</div>
    var radio = Util.create("div");
    radio.classList.add("g-radio-button");
    for(i=0; i< values.length; i++){
        var div = document.createElement("div");
        div.classList.add("form-check");
        var label = Util.create("label", {'for': "radio-" + name + values[i], 'class': 'form-check-label'});
        var input = Util.create("input", {'class': 'form-check-input', 'type': 'radio', 'name': name, 'value': values[i], 'id': "radio-" + name + values[i]});
        if(i == 0){input.checked = true;}
        div.appendChild(input);
        div.appendChild(label);
        label.innerHTML += labels[i];
        radio.appendChild(div);
    }
    elt.appendChild(radio);

}
 }
