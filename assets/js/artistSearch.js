 // Initialize Firebase Mos firebase to google-location api
  var config = {
    apiKey: "AIzaSyCPyjktJ_xuju1gmL1x8ogZB7DaYVXwzgM",
    authDomain: "project-1-see-to-play.firebaseapp.com",
    databaseURL: "https://project-1-see-to-play.firebaseio.com",
    storageBucket: "project-1-see-to-play.appspot.com",
    messagingSenderId: "777613307214"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var clickCounter = 0;

  $("#find-me").on("click", function() {
  
  var lastCount = clickCounter;
    // Add to clickCounter
    clickCounter++;

    // ***** Store Click Data to Firebase in a JSON property called clickCount *****
    // Note how we are using the Firebase .set() method
    database.ref().set({
      clickCount: clickCounter,
      name: 'Moe',
      lastClickCount: lastCount
    });
  })

  database.ref().on("value", function(snapshot) {

    // Then we console.log the value of snapshot
    console.log(snapshot.val());

    // Then we change the html associated with the number.
    /*
    snapshot.val() =
    {
      clickCount: clickCounter
    }
    */
    // $("#find-me").html(snapshot.val().clickCount);

    // // Then update the clickCounter variable with data from the database.
    // clickCounter = snapshot.val().clickCount;

  // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
  // Again we could have named errorObject anything we wanted.
  }, function (errorObject) {

    // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);

  });

    //Search


        function getArtistTrack(artist){

        // Run an initial search to identify the artist unique Spotify ID
        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Prints the entire object to console
            console.log(response);

            // Prints the Artist ID from the Spotify Object to console.
            var artistID = response.artists.items[0].id;

            // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
            var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";

            // We then run a second AJAX call to get the tracks associated with that Spotify ID
            $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {

                // Gets the tracks
                console.log(trackResponse);

                // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
                var player = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+trackResponse.tracks[0].id+'" frameborder="0" allowtransparency="true"></iframe>';

                // Appends the new player into the HTML
               $("#playerDiv").append(player)
            })
        });     
    }


    // On Button Click for Artist Selection
    $('#selectArtist').on('click', function(){

        // Grab the Artist Name
        var artist = $('#artist-input').val().trim();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        getArtistTrack(artist);

        // Prevents moving to the next page
        return false;
    });

      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            currentUserPosition = pos;


            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
            console.log(currentUserPosition);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }



$('#selectSearch').on('click', function(){

        // Grab the Artist Name
        var searchInput = $('#search-input').val();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        console.log(searchInput);

        // Prevents moving to the next page
        return false;
    });




      

