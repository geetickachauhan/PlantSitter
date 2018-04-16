var logged_in_user = {"id": 0, 'firstName': "Gandalf", "lastName": "The Grey"};

var uniqueID = (function() {
   var id = 0;
   return function() { return id++; };
})();

class Plant {

	//{'name': null, 'type': null, 'watering_freq': [[0,0,0,0,0,0,0],null], }

	constructor(photo_url, name, type, watering_freq, fertilizer_freq, pesticide_freq, health, light, trimming, ...args){
		let keys = ['name', 'type', 'watering_freq', 'fertilizer_freq', 'pesticide_freq', 'health', 'light', 'trimming'];
		for (let index = 0 ; index < keys.length ; index++)
				this[keys[index]] = arguments[index + 1];

    this.status = new Status();
    this.photo_url = photo_url;

    if (!args.length){
      this.id = uniqueID();
      this.owner = logged_in_user.id;
    }
    else { //for registering plants into the system, since we don't have a backend
      this.id = args[0];
      this.owner = args[1];
    }


	}

	updateProperties(prop_obj){
		for (let key of prop_obj)
			this[key] = prop_obj[key];
	}

	requestForCare(start_date, end_date){
		this.status.update(1, start_date, end_date)
	}

	cancelRequestForcare(){
		this.status.update(0);
	}

	requestToCare(){
		this.status.addRequester(logged_in_user.id);
	}

	cancelRequestToCare(){
		this.status.removeRequester(logged_in_user.id);
	}

	approveCareRequest(requester_id){
		this.status.update(2);
	}

	cancelCareReqApproval(){
		this.status.revertApproval();
	}

	transitionDone(){
		this.status.update(3);
	}


}

//status_codes: 0-> at_home, 1 -> care_requested 2-> in_transition 3-> in_care

class Status{
	constructor(){
		this.update(0);
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

		this.status_code = status_code;
 	}

	addRequester(){
		this.req_caretakers.push(logged_in_user.id);
	}

	removeRequester(){
		this.req_caretakers.splice(this.req_caretakers.indexOf(logged_in_user.id), 1);
	}

	revertApproval(){
		this.app_caretaker = null;
		this.status_code = 1;
	}

 }

Sauron = new Plant(null,"Sauron", "Rose", [[1,0,0,1,0,0,0], 2], [[1,0,0,1,0,1,0], 1], [[1,0,1,1,0,0,0], 2], 1, 0, 1);
Sauron.requestForCare(2, 3);

Balrog = new Plant(null,"Balrog", "Orchid", [[1,0,0,1,0,0,0], 1], [[1,0,0,1,0,1,0], 0], [[1,0,1,1,0,0,0], 2], 0, 1, 1);
