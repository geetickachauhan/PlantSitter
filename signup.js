Util.events(document, {
    "DOMContentLoaded": function() {

        Util.one("#btnSignUp").addEventListener("click", function(event) {
            event.preventDefault(); //stops the page from refreshing
            //Fetch form to apply custom Bootstrap validation
            var form = Util.one("#formSignUp");

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
            else{

              let id = parseInt(registered_users[registered_users.length - 1].id) + 1;
              let firstname = Util.one("#firstname").value;
              let lastname = Util.one("#lastname").value;
              let email = Util.one("#email").value;
              let password = Util.one("#pwd1").value;
              let star = 0;
              let new_user = {"id": id, "firstName": firstname, "lastName": lastname,
              "photo_url": "", "star": star, "phone": "", "email": email, "description": "",
              "password": password}
              registered_users.push(new_user);
              sessionStorage.setItem('registered_users', JSON.stringify(registered_users));
              sessionStorage.setItem('logged_in_user', JSON.stringify(new_user));

              window.location.href = "homepage.html";
              }


          });

        Util.one("#btnLogin").addEventListener("click", function(event){
          window.location.href = "index.html";
        });
    }
});

function checkPassword(input){
    if (input.value != Util.one('#pwd1').value) {
        input.setCustomValidity('Password Must be Matching');
    }
    else {
            // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}
