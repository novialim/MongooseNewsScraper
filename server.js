/* Showing Mongoose's "Populated" Method
 * =============================================== */

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

const PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
// mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/mongoscraper" );
mongoose.connect("mongodb://heroku_77wpkcvd:7ump1ovd4qobahqd3umts5kpv8@ds161860.mlab.com:61860/heroku_77wpkcvd");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// get routes here
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Listen on port 3000
app.listen(PORT, function() {
    console.log("App running on port "+ PORT);
});