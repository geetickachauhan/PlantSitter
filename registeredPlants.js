//acts as the plants database

let user_ = registered_users[1]

var registered_plants = [
  {"photo_url": null, "name": "Beren", "type": "Cactus",
  "watering_freq": [[0,1,0,0,0,0,0], 0], "fertilizer_freq": [[0,0,1,0,0,0,0], 1],
  "pesticide_freq": [[0,0,0,0,0,0,0], 2],"health": 1, "light": 1, "trimming": 0, 'instructions': "",
  "id": 0, "owner": 0, "status": {"status_code": 1, "start_date": "04/24/2018",
  "end_date":"04/27/2018", "req_caretakers": [1,2], "app_caretaker": null}},

  {"photo_url": null, "name": "Sauron", "type": "Rose",
  "watering_freq": [[0,1,0,1,0,1,0], 2], "fertilizer_freq": [[0,0,1,0,0,0,0], 1],
  "pesticide_freq": [[0,0,0,0,1,0,0], 1],"health": 0, "light": 1, "trimming": 1, 'instructions': "",
  "id": 1, "owner": 0, "status": {"status_code": 0, "start_date": null, "end_date":null,
  "req_caretakers": null, "app_caretaker": null}},

  {"photo_url": null, "name": "Balrog", "type": "Orchid",
  "watering_freq": [[0,1,0,0,1,0,0], 2], "fertilizer_freq": [[0,0,1,0,0,0,0], 2],
  "pesticide_freq": [[0,0,0,0,1,0,0], 1],"health": 1, "light": 0, "trimming": 1, 'instructions': "",
  "id": 2, "owner": 0, "status": {"status_code": 2, "start_date": "05/30/2018", "end_date":"06/20/2018",
  "req_caretakers": [user_], "app_caretaker": user_ }},

];
