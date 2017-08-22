// Requiring our Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

module.exports = function(app) {

    // Route to save our article to mongoDB via mongoose
    app.post("/save", function(req, res) {

        var article = new Article(req.body);

        // With the new "Article" object created, we can save our data to mongoose
        article.save(function(error, doc) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise, send the new doc to the browser
            else {
                res.redirect("/");
            }
        });
    });

    // Routes
    // ======


    // This will get the articles we scraped from the mongoDB
    app.get("/articles", function(req, res) {
        // Grab every doc in the Articles array
        Article.find({}, function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Or send the doc to the browser as a json object
            else {
                res.render("saved", { savedArticles: doc });
            }
        });
    });

    // Route to remove saved article
    app.get("/remove/:id", function(req, res) {
        Article.remove({ _id: req.params.id }, function(error) {
            if (error) {
                console.log('There was an error removing document:', error);
            };
            res.json({ message: true, id: req.params.id });
        });
        // return user to saved screen


    })

    // Grab an article by it's ObjectId
    app.get("/articles/:id", function(req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        Article.findOne({ "_id": req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            // now, execute our query
            .exec(function(error, doc) {
                // Log any errors
                if (error) {
                    console.log(error);
                }
                // Otherwise, send the doc to the browser as a json object
                else {
                    res.json(doc);
                }
            });
    });


    // Create a new note or replace an existing note
    app.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        var newNote = new Note(req.body);
        console.log("new note" + newNote);

        // And save the new note to the db
        newNote.save(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                // Use the article id to find it's notes

                Article.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'note': doc._id } }, { new: true, upsert: true })
                    .populate('note')

                    // Execute the above query
                    .exec(function(err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        } else {
                            // Or send the document to the browser
                            res.send(doc);
                        }
                    });
            }
        });
    });

    // Delete note
    app.get("/deletenote/:id", function(req, res) {

        Note.remove({
            "_id": req.params.id
        }, function(error, removed) {
            // Log any errors from mongojs
            if (error) {
                console.log(error);
                res.send(error);
            }
            // Otherwise, send the mongojs response to the browser
            // This will fire off the success function of the ajax request
            else {
                console.log(removed);

                Article.update({}, { $pull: { note: { $in: [req.params.id] } } })

                    // Execute the above query
                    .exec(function(err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        }

                    });
            }

        });
    })


    // // And save the new note to the db
    // newNote.save(function(error, doc) {
    //     // Log any errors
    //     if (error) {
    //         console.log(error);
    //     }
    //     // Otherwise
    //     else {
    //         // Use the article id to find it's notes

    //         Article.findOneAndUpdate({ '_id': req.params.id }, { $push: { 'note': doc._id } }, { new: true, upsert: true })
    //             .populate('note')

    //             // Execute the above query
    //             .exec(function(err, doc) {
    //                 // Log any errors
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     // Or send the document to the browser
    //                     res.send(doc);
    //                 }
    //             });
    //     }
    // });




};