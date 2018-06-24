$.getJSON("/articles", (data) => {
    for (i = 0; i < data.length; i++) {
        $("#card-body").append("<p data-id='"
            + data[i]._id + "'>"
            + data[i].title + 
            "<button class = 'btn btn-success' data-id=" + data[i]._id + "> Save </button>" + "<br />"
            + data[i].summary + "<br />"
            + data[i].link +
            "</p>");
    }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    $("#notes").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

        .then(function (data) {
            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });


});


$(document).on("click", "#savenote", function() {
    
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
   
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  