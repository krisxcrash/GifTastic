$(document).ready(function() {

	$("button").on("click", function() {
		var person = $(this).attr("data-person");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: 'GET'
    })
    .done(function(response) {
    	var results = response.data;

    	for (var i = 0; i < results.length; i++) {
    		var gifData = $("<div class='item'>");

    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var personImage = $("<img>");
    		personImage.attr("src", results[i].images.fixed_height.url);

    		gifDiv.html(p);
    		gifDiv.html(personImage);

    		$("#gifsHere").html(gifDiv);
    	}
    })

	})
})