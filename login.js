Util.events(document, {
    "DOMContentLoaded": function() {  
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
                console.log("Form was validated");
            }


          });
    }
});
