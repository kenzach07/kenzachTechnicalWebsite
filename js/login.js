	//Validtion Code For Inputs

    var email = document.forms['form']['email'];
    var password = document.forms['form']['password'];
    
    var email_error = document.getElementById('email_error');
    var pass_error = document.getElementById('pass_error');
    
    email.addEventListener('textInput', email_Verify);
    password.addEventListener('textInput', pass_Verify);
    
    function validated(){
        if (email.value != "kenzach" || password.value != "cool") {
            email.value="";
            password.value = "";
            alert("WRONG CREDENTIALS");
            return false;
        }
    
    }
    function email_Verify(){
        if (email.value == "kenzach" || password.value == "cool") {
            email.style.border = "1px solid silver";
            email_error.style.display = "none";
            return true;
        }
    }
  

   
    
    