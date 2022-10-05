	//Validtion Code For Inputs

    var email = document.forms['form']['email'];
    var password = document.forms['form']['password'];
    
    function validated(){
        if (email.value != "kenzach" || password.value != "cool") {
            email.value="";
            password.value = "";
            alert("WRONG CREDENTIALS");
            return false;
        }else{
            return true;
        }
    
    }
   
  

   
    
    