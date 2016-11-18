  $(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUL4yEypahaDrnWtUWH-OqfP5ER5SOvsw",
    authDomain: "see-to-play.firebaseapp.com",
    databaseURL: "https://see-to-play.firebaseio.com",
    storageBucket: "see-to-play.appspot.com",
    messagingSenderId: "974071434310"
  };
    firebase.initializeApp(config);

  	var database = firebase.database();

    $("#signUp").on("click",function(){

    	var userName = $("#contact-name").val().trim();
      var userEmail = $("#email").val().trim();

      var userinput = {
        name: userName,
        email: userEmail,
      }

      database.ref().push(userinput);

      $("#contact-name").val("");
      $("#email").val("");

      return false;
    });

        database.ref().on("child_added", function(childSnapshot){
        var userName = childSnapshot.val().name;
        var userEmail = childSnapshot.val().email;

    });

  });

