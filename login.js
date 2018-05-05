Util.events(document, {
    "DOMContentLoaded": function() {

        Util.all("input").map(el => el.addEventListener("change", function(e){
            Util.one(".alert").classList.add("hidden");
        }));

        $("#btnLogin").click(function(event) {
            event.preventDefault(); //stops the page from refreshing
            //Fetch form to apply custom Bootstrap validation

            var form = Util.one("#formLogin");

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
            else{
                let email = Util.one("#email").value;
                let password = Util.one("#pwd1").value;

                let auth_user = registered_users.filter(user => user.password == password && email == user.email)[0];

                if (!auth_user){
                  Util.one(".alert").classList.remove("hidden");
                }
                else {
                  localStorage.setItem('logged_in_user', JSON.stringify(auth_user));
                  window.location.href = "homepage.html";
                }

            }


          });

        $("#btnSignup").click(function(event){
          window.location.href = "signup.html";
        });
    }
});
