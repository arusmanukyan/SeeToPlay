 // Initialize Firebase Mos firebase to google-location api
  // var config = {
  //   apiKey: "AIzaSyCPyjktJ_xuju1gmL1x8ogZB7DaYVXwzgM",
  //   authDomain: "project-1-see-to-play.firebaseapp.com",
  //   databaseURL: "https://project-1-see-to-play.firebaseio.com",
  //   storageBucket: "project-1-see-to-play.appspot.com",
  //   messagingSenderId: "777613307214"
  // };

  // firebase.initializeApp(config);

  // var database = firebase.database();
  // var clickCounter = 0;

  // $("#find-me").on("click", function() {
  
  // var lastCount = clickCounter;
  //   // Add to clickCounter
  //   clickCounter++;

  //   // ***** Store Click Data to Firebase in a JSON property called clickCount *****
  //   // Note how we are using the Firebase .set() method
  //   database.ref().set({
  //     clickCount: clickCounter,
  //     name: 'Moe',
  //     lastClickCount: lastCount,
  //     location: pos
  //   });
  // })

  // database.ref().on("value", function(snapshot) {

  //   // Then we console.log the value of snapshot
  //   console.log(snapshot.val());

  //   // Then we change the html associated with the number.
  //   /*
  //   snapshot.val() =
  //   {
  //     clickCount: clickCounter
  //   }
  //   */
  //   // $("#find-me").html(snapshot.val().clickCount);

  //   // // Then update the clickCounter variable with data from the database.
  //   // clickCounter = snapshot.val().clickCount;

  // // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
  // // Again we could have named errorObject anything we wanted.
  // }, function (errorObject) {

  //   // In case of error this will print the error
  //     console.log("The read failed: " + errorObject.code);

  // });

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

      var currentUserPosition;
      

      if (localStorage.getItem("location" !== null)) {
        currentUserPosition = localStorage.getItem("location");
      }

      function setLocation (thingy) {
        currentUserPosition = thingy;
        // localStorage.setItem("location", thingy);
      }


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


            setLocation(currentUserPosition);


            infoWindow.setPosition(pos);
            infoWindow.setContent('Found You!');
            map.setCenter(pos);

            // console.log("currentUserPosition @ initMap function: ", pos);

            // var map;
            // var infowindow;
            // var myPlace = {lat: 25.276987, lng: 55.296249 }; 

            // myPlace = pos; 

            var service = new google.maps.places.PlacesService(map);
            
            service.nearbySearch(
            {

                location : pos,
                radius : 5500,
                type : [ 'restaurant' ]
            }, callback);
            
            function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }

function createMarker(place, callback) {

            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map : map,
                position : place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
              
              var infowindow = new google.maps.InfoWindow({ map: map });
                infowindow.setContent(place.name + " Rating: " + place.rating);
                infowindow.open(map, this);

            });
        }

          },
        function() {
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

// console.log("currentUserPosition out of scope: ",currentUserPosition);

$('#selectSearch').on('click', function(){

        // Grab the Artist Name
        var searchInput = $('#search-input').val();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        console.log(searchInput);

        // Prevents moving to the next page
        return false;
    });

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


      

