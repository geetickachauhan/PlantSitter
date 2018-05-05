Util.events(document, {
    "DOMContentLoaded": function() {

        let remembered_user = JSON.parse(localStorage.getItem('remembered_user'));
        if (remembered_user){
          Util.one("#email").value = remembered_user.email;
          Util.one("#pwd1").value = remembered_user.password;
        }

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
                  let remember = Util.one("#checkbox").checked;
                  if (remember)
                    localStorage.setItem('remembered_user', JSON.stringify(auth_user));
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
