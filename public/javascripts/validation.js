$(document).ready(function(){
    $("#registerform").validate({
           rules:{
               username:{
                   required:true,
                   minlength:4
               },

               email:{
                required:true,
                email:true
               },

               password:{
                required:true,
                minlength: 6
               },

               conform_password: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            }
            
           },
     
    })
})
