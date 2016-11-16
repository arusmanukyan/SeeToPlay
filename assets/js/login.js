var modal = (function(){
  var 
  method = {},
  	$overlay,
  	$modal,
  	$content,
  	$close;

	// turns the variables into divs with IDs.
	$overlay = $('<div id="overlay"></div>');
	$modal = $('<div id="modal"></div>');
	$content = $('<div id="content"></div>');
	$close = $('<a id="close" href="#">close</a>');

	// inserts the content into the modal
	$modal.append($content, $close);

	// puts the modal into the body of the html
	$(document).ready(function(){
		$("body").append($overlay, $modal);

	});
  // Center the modal in the viewport
	method.center = function() {
	  var top, left;
	  // this is the equation that tells it to go center of the screen no matter where the scroller is with in the website.
	  top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
	  left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

	  $modal.css({
	    top:top + $(window).scrollTop(), 
	    left:left + $(window).scrollLeft()
	  });
	};
  // Open the modal
 	method.open = function (settings) {
	  $content.empty().append(settings.content);
// sets with and height of the modal and centers it. Auto opens it first.
	  $modal.css({
	    width: settings.width || "auto", 
	    height: settings.height || "auto"
	  })

	  method.center();

	  $(window).bind("resize.modal", method.center);

	  $modal.show();
	  $overlay.show();
	};
  // Close the modal
	method.close = function () {
	  $modal.hide();
	  $overlay.hide();
	  $content.empty();
	  $(window).unbind("resize.modal");
	};

	// close button
	$close.click(function(event){
		event.preventDefault();
		method.close();
	});

  return method;
}());	

$(document).ready(function(){ 

		modal.open({content:
			"<h1>Welcome to See to Play.</h1><p> Here's how it works. Google finds your location. We show a list of your local concerts. You pick your desired event and play the artists songs all on one website.</p>"
     , width: "500px", height: "200px"})
});