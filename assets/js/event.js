$("#findEvent").on("click", function(){


var event = $("#event-input").val();
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + event + "&apikey=RpM9rSFGdHGSrdzuSU4XFzBiFomGgnhi";

	$.ajax({url: queryURL, method: "GET"}).done(function(response){


var firstRowTds = $("table").children().eq(1).children("tr").eq(0).children("td");
	
var anchor = $("<a>").attr("href", response._embedded.events[0].url);
anchor.text(response._embedded.events[0].url)

firstRowTds.eq(0).text(response._embedded.events[0].name);

firstRowTds.eq(1).text(response._embedded.events[0].dates.start.localDate);

firstRowTds.eq(2).html(anchor);

	


	
	
});
	
return false;

})