// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// Initialize Express
var app = express();


// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

//require handlebars
var exphbs = require("express-handlebars");

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set("view engine", "handlebars");

// Require all models
var db = require("./models");

//our port
var PORT = 3000;

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.render("index");
});

// Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {

    //make request to new york times
    axios.get("https://www.nytimes.com").then(function (response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each element with a "title" class
        $("article").each(function (i, element) {

            // Save an empty result object
            var result = {};
            // Save the text and href of each link enclosed in the current element
            result.title = $(this).find("h2").text();
            result.summary = $(this).find("li").text();
            result.link = $(this).find("a").attr("href");

            //create the article
            var article = new Article
        });
    });

    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(PORT, function () {
    console.log("App running on port: " + PORT);
});
