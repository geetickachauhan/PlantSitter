

//TODO: store plant changes in session storage

var uniqueID = (function() {
   var id = 100;
   return function(f) { return id++; };
})();


class Plant {

	constructor(photo_url, name, type, watering_freq, fertilizer_freq, pesticide_freq, health, light, trimming, instructions, ...args){
		let keys = ['name', 'type', 'watering_freq', 'fertilizer_freq', 'pesticide_freq', 'health', 'light', 'trimming', 'instructions'];
		for (let index = 0 ; index < keys.length ; index++)
				this[keys[index]] = arguments[index + 1];

    this.photo_url = photo_url;

    if (!args.length){
      this.id = uniqueID();
      this.owner = logged_in_user.id;
      this.status = new Status();


    }
    else { //for registering plants into the system, since we don't have a backend
      this.id = args[0];
      this.owner = args[1];
      this.status = new Status(...args[2]);
    }


	}

	updateProperties(prop_obj){
		for (let key of prop_obj)
			this[key] = prop_obj[key];

    Helpers.updatePlantStorage(this);
	}

	requestForCare(start_date, end_date){
		this.status.update(1, start_date, end_date);

    Helpers.updatePlantStorage(this);
	}

	cancelRequestForcare(){
		this.status.update(0);
    Helpers.updatePlantStorage(this);
	}

	requestToCare(){
		this.status.addRequester(logged_in_user);
    Helpers.updatePlantStorage(this);
	}

	cancelRequestToCare(){
		this.status.removeRequester(logged_in_user);
    Helpers.updatePlantStorage(this);
	}

	approveCareRequest(requester_id){
		this.status.update(2, requester_id);
    Helpers.updatePlantStorage(this);
	}

	cancelCareReqApproval(){
		this.status.revertApproval();
    Helpers.updatePlantStorage(this);
	}

	transitionDone(){
		this.status.update(3);
    Helpers.updatePlantStorage(this);
	}

  requestForAdoption(){
    this.status.update(4);
    Helpers.updatePlantStorage(this);
  }

  cancelRequestForAdoption(){
    this.status.update(0);
    Helpers.updatePlantStorage(this);
  }

  returnHome(){
    this.status.update(0);
    Helpers.updatePlantStorage(this);
  }

  approveAdoptionRequest(requester_id){
    this.status.update(0);
    this.owner = requester_id;
    Helpers.updatePlantStorage(this);
  }


}

//status_codes: 0-> at_home, 1 -> care_requested 2-> in_transition 3-> in_care 4-> "up for adoption"

class Status{
	constructor(...args){ //args is passed for initializing with properties, to mimick a backend
    if (!args.length)
		  this.update(0);
    else {
      this.status_code = args[0];
      this.start_date = args[1];
      this.end_date = args[2];
      this.req_caretakers = args[3];
      this.app_caretaker = args[4];
    }
	}


	update(status_code, ...args){
		if (status_code == 0){
			this.start_date = null;
			this.end_date = null;
			this.req_caretakers = [];
			this.app_caretaker = null;
		}
		else if (status_code == 1){
		 	this.start_date = args[0];
			this.end_date = args[1];
		 }
		else if (status_code == 2){
			this.app_caretaker = args[0];
		}
    else if (status_code == 4){
      this.update(0);
      this.status_code = 4;
    }

		this.status_code = status_code;
 	}

	addRequester(){
		this.req_caretakers.push(logged_in_user);
	}

	removeRequester(){
		this.req_caretakers.splice(this.req_caretakers.indexOf(logged_in_user), 1);
	}

	revertApproval(){
		this.app_caretaker = null;
		this.status_code = 1;
	}

 }
