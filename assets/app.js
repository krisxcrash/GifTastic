var gifSearch = ["scooby doo", "shaggy rogers", "velma", "daphne"];

$(document).ready(function() {



    	renderButtons();




    // function to query the gifs on button click

	$("button").on("click", function() {

// assigns attribute to button for gif query


		var gifButton = $(this).attr("data-person");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifButton + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .done(function(response) {
    	var results = response.data;

    	for (var i = 0; i < results.length; i++) {
    		var gifDiv = $("<div class='item col-md-4'>");

    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var gifImage = $("<img>");
    		gifImage.attr("src", results[i].images.fixed_width_still.url);
    		gifImage.attr("data-still", results[i].images.fixed_width_still.url);
    		gifImage.attr("data-animate", results[i].images.fixed_width.url);
    		gifImage.attr("data-state", "still");
    		gifImage.attr("height", "200");
    		gifImage.attr("width", "300")
    		gifImage.addClass("gif");

    		gifDiv.prepend(p);
    		gifDiv.prepend(gifImage);

    		$("#gifsHere").prepend(gifDiv);
    	};

    //if statement to pause and play gifs

      $(".gif").on("click", function() {
      	console.log("click")

		var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

      if (state === "still") {
      	console.log("still")
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
      }
      else {
      	console.log("animate")
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      };

	});

    });

   });

// function to add buttons when user searches

    function renderButtons() {
    	$("#buttons").empty();

		for (var i = 0; i < gifSearch.length; i++) {

			var a = $("<button>");
			a.addClass("btn btn-default btn-lg btnDesign giphyButton");
			a.attr("data-person", gifSearch[i]);
			a.text(gifSearch[i]);

			$("#buttons").append(a);
		}	

    }

    $("#searchButton").on("click", function(event) {
    	event.preventDefault();

    	var gifButton = $("#searchInput").val().trim();

    	gifSearch.push(gifButton);

    	renderButtons();
    });

    // $(document).on("click", ".giphyButton", displayGiphy);

    // renderButtons();

});    