function articleCount(obj) {
    return obj.length;
};


$(document).ready(function() {

    // add click listeners to save buttons
    $(".save").on("click", function() {

        // what article on the page is this?
        var index = $(this).attr("data-index");
        // build article object for post route based on index
        var thisArticle = {
            title: $("a[data-link-index='" + index + "']").text(),
            link: $("a[data-link-index='" + index + "']").attr("href"),
            summary: $(".summary[data-summary-index='" + index + "']").text()
        };

        $(".article[data-index='" + index + "']").slideUp("slow");

        // console.log(thisArticle.title + " " + thisArticle.link + " " + thisArticle.summary);
        $.post("/save", thisArticle), function(success){

            console.log(success);

            if (success.message) {
            }
        };

        // now remove article from index page
        // $(".article[data-index='"+ index +"']").slideUp("slow");  
    })

    // add click listener to remove button; we're not handling this entirely in back end because we want a nice slide-up action
    $(".remove").on("click", function() {
        $.get("/remove/" + $(this).attr("data-article-id"), function(success) {
            if (success.message) {
                $(".article[data-id='" + success.id + "']").slideUp("slow");
            }
        })
    });

    
// delete note
$(document).on("click", ".delnotebtn", function() {

    var thisId = $(this).attr("value");

    $("#articleId").attr("value", $(this).attr("data-article-id"));

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/deletenote/" + thisId
        })
        // With that done, add the note information to the page
        .done(function(data) {
            // console.log(data);
            

        });
});    




// Whenever someone clicks add note button, populate modal form with any existing notes and add article id to note button
$(document).on("click", ".notes", function() {

    var thisId = $(this).attr("data-article-id");

    $("#articleId").attr("value", $(this).attr("data-article-id"));

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .done(function(data) {
            // console.log(data);
            
            // If there's a note in the article
            if (data.note) {

                console.log(data.note);
                $("#modal-notes").html("");

                for (var i=0; i<data.note.length; i++){
                    console.log(data.note[i].body);


                    $("#modal-notes").append(data.note[i].body+"&nbsp;&nbsp;&nbsp;"+"<button type=\"submit\" value="+data.note[i]._id+" class=\"delnotebtn btn btn-primary\" data-dismiss=\"modal\">x</button><hr />");
                }
            }
        });
});

// When you click the savenote button
$(document).on("click", ".notebtn", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("value");
    var savenote = $("#bodyinput").val();

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from note textarea
                body: savenote
            }
        })
        // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
});


}); // end document ready function