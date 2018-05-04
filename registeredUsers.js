var registered_users_arr = [
    {
      "id": 0, 'firstName': "Gandalf", "lastName": "The Grey",
      "photo_url": "img/gandalf.png","star": 5, "phone": '4078663956',
      "email": 'gandalf@gmail.com', "description" : "I'm a wizard. Deal with it.",
      "password": "flyyoufools"
    },
    {
        "id": 1,
        "firstName": "Bilbo", "lastName": "Baggins", "photo_url": "img/user.png",
        "star": 4.5, "phone": '4056778978', "email": 'bilbo@gmail.com',
        "description" : 'I went there and came back again.',
        "password": "igotthering"
    },
    {
        "id": 2,
        "firstName": "Frodo", "lastName": "Son of Drogo", "photo_url": "",
        "star": 5, "phone": '4078663956', "email": 'frodo@gmail.com',
        "description" : 'Samwise is the real hero.',
        "password": "where'ssam"
    },
     {
        "id": 3,
        "firstName": "Saruman", "lastName": "The White", "photo_url": "",
        "star": 2.5, "phone": '7089446573', "email": 'saruman@gmail.com',
        "description" : 'I was legit before the Palantir got into my head.',
        "password": "i'mcool"
    }
]



if (!JSON.parse(sessionStorage.getItem('registered_users'))){
  sessionStorage.setItem('registered_users', JSON.stringify(registered_users_arr));
}
var registered_users = JSON.parse(sessionStorage.getItem('registered_users'));




//var logged_in_user = JSON.parse(sessionStorage.getItem('logged_in_user'));
