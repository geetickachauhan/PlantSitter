//acts as the plants database

let user_ = registered_users[1]

var registered_plants = [
  {"photo_url": 'img/plant4.png', "name": "Beren", "type": "Cactus",
  "watering_freq": [[0,1,0,0,0,0,0], 0], "fertilizer_freq": [[0,0,1,0,0,0,0], 1],
  "pesticide_freq": [[0,0,0,0,0,0,0], 2],"health": 1, "light": 1, "trimming": 0, 'instructions': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "id": 0, "owner": 0, "status": {"status_code": 1, "start_date": "04/24/2018",
  "end_date":"04/27/2018", "req_caretakers": [1,2], "app_caretaker": null}},

  {"photo_url": 'img/plant1.png', "name": "Sauron", "type": "Rose",
  "watering_freq": [[0,1,0,1,0,1,0], 2], "fertilizer_freq": [[0,0,1,0,0,0,0], 1],
  "pesticide_freq": [[0,0,0,0,1,0,0], 1],"health": 0, "light": 1, "trimming": 1, 'instructions': "",
  "id": 1, "owner": 0, "status": {"status_code": 0, "start_date": null, "end_date":null,
  "req_caretakers": null, "app_caretaker": null}},

  {"photo_url": 'img/plant2.svg', "name": "Balrog", "type": "Orchid",
  "watering_freq": [[0,1,0,0,1,0,0], 2], "fertilizer_freq": [[0,0,1,0,0,0,0], 2],
  "pesticide_freq": [[0,0,0,0,1,0,0], 1],"health": 1, "light": 0, "trimming": 1, 'instructions': "",
  "id": 2, "owner": 0, "status": {"status_code": 2, "start_date": "05/30/2018", "end_date":"06/20/2018",
  "req_caretakers": [user_], "app_caretaker": user_ }},

];
var current_plant = registered_plants[0];