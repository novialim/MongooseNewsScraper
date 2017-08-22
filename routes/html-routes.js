var cheerio = require("cheerio");

// for getting HTML from URLs
var request = require("request");

var Article = require("../models/Article.js");

module.exports = function(app) {

    // A GET request to scrape the echojs website
    app.get("/", function(req, res) {
        // First, we grab the body of the html with request
        request("https://www.positive.news/", function(error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);

            var articleArr = [];

            $(".item-wrapper").each(function(i, element) {

                // Save an empty result object
                var result = {};
                // Add the text and href of every link, and save them as properties of the result object
                result.link = $(element).children("h3").children("a").attr("href");
                result.title = $(element).children("h3").text();
                result.summary = $(element).children(".the-excerpt").text();

                if (result.link !== undefined) {

                    articleArr.push({ title: result.title, link: result.link, summary: result.summary });
                }

            });

            res.render("index", { articles: articleArr });

        });
    });

};