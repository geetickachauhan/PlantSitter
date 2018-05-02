Util.events(document, {
    "DOMContentLoaded": function() {  
        $("#btnSignUp").click(function(event) {
            event.preventDefault(); //stops the page from refreshing
            //Fetch form to apply custom Bootstrap validation
            var form = Util.one("#formSignUp");

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

function checkPassword(input){
    if (input.value != Util.one('#pwd1').value) {
        input.setCustomValidity('Password Must be Matching');
    } 
    else {
            // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}