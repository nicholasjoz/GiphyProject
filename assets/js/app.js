var topics=["turtles", "hamsters", "rattlesnake", "penguin", "parrot", "puppies", "kitties", "giraffes",  "french bulldog", "frogs", "orangutang", "lion", "anteater", "seal", "penguin"]

//Function to dynamically generate "starting buttons" from array
//WORKING just need to add spaces, increase length of Array?
function renderButtons(){
    $("#animalButtons").empty();
    for (var i=0; i<topics.length; i++) {
        var an= $("<button>");
        an.addClass("animals");
        an.attr("data-name", topics[i].toUpperCase());
        an.text(topics[i].toUpperCase());
        $("#animalButtons").append(an);

    }
}


// Search functionality- pull what is searched, put in new button
//WORKING

$("#addAnimal").on("click", function(event) {
    event.preventDefault();
    var newAnimal= $("#animal-input").val().trim();
    topics.push(newAnimal.toUpperCase());
    renderButtons()
})

renderButtons();


// Function to pull Gifs when clicked (add rating)
// Newly populated buttons not generating gifs, prevent other buttons from working...?
// Console log shows Data name populating correctly, not sure why this doesn't work (properly added to array
function getGifs() {
    $("#animals").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&rating=g&rating=pg&api_key=vveZ7coNg1VSry5aSduXA0tFn6MLKDV6&limit=10";
    console.log(this);
    

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height_still.url);
// change to prepend if you want ratings after the gif
          gifDiv.append(p);
          gifDiv.append(animalImage);

          $("#animals").prepend(gifDiv);
// attempt to have gifs start as "still"
         animalImage.attr("data-gif-still", results[i].images.fixed_height_still.url);
         animalImage.attr("src", results[i].images.fixed_height_still.url);
         animalImage.attr("data-gif-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        }
      });
  };

  //attempt to have click animate/pause
  // need to set data-still to 

  // just create function - call on different line
  // $("img").on("click", 
 function animation() {
    var state = $(this).attr("data-state");
    // var state = $(this).attr("data-state");
    if (state === "still") {
        // attempt to 'fix' this line below to show image should be animated gif
        var animating = $(this).attr("data-gif-animate");
        console.log(animating);
      $(this).attr("src", animating);
      $(this).attr("data-state", "animate");
    } else {
        // line below supposed to set image source to still image when 'still'
        var stillstate = $(this).attr("data-gif-still");
      $(this).attr("src", stillstate);
      $(this).attr("data-state", "still");
    }
  };

  // function given by tutor , was going to use until I got my own function (line 78) working
  function startGif() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
      $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
      $(this).removeClass('playing');
    } else {
      $(this).addClass('playing');
      $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
    }
   }

  $(document).on("click", "img", animation);
  $(document).on("click", ".animals", getGifs);
 
  //Pause and unpause when clicked

