var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var request = require("request");
// var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsapp");


// app.get("/", (req, res) => {
//     res.send("Hello World")
// });

app.get("/scrape", (req, res) => {
    request("https://www.vox.com/", (error, res, html) => {
        var $ = cheerio.load(html);
        var result = {};

        $("h2").each(function (i, element) {

            result.title = $(this).children("a").text();
            result.sum = $(this).children("p").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });
        console.log(result);
    });
    res.send("Scrape Complete")
});





// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
