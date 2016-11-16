  $(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjB_F2kuSDsezSfXwQMTA5hXRC6kD87v4",
    authDomain: "classproject1-6a90e.firebaseapp.com",
    databaseURL: "https://classproject1-6a90e.firebaseio.com",
    storageBucket: "classproject1-6a90e.appspot.com",
    messagingSenderId: "306797326634"
  };
  firebase.initializeApp(config);

  	var database = firebase.database();

    $("#signUp").on("click",function(){

    	var userName = $("#contact-name").val().trim();
        var userEmail = $("#email").val().trim();

        database.ref().push({
        	userName: userName,
        	userEmail: userEmail,

        })

        $("#contact-name").val("");
        $("#email").val("");


    });


  });

  $("#information")