require('dotenv').config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//user inputs
var command = process.argv[2];
var input = "";
for (let i = 3; i < process.argv.length; i++) {
    input += (process.argv[i] + " ");
}


UserInputs(command, input);

function UserInputs(command, input) {
    switch (command) {
        case 'spotify-this-song':
            songInfo(input);
            break;
        case 'movie-this':
            movieInfo(input);
            break;
        case 'do-what-it-says':
            randomInfo();
            break;
        default:
            console.log("Oops! Invalid Option.Please enter valid option.");
    }
}

//function for spotify this song

function songInfo(input) {
    if (input === "") {
        input = "The Sign Ace of Base";
    }
    spotify.search({ type: "track", query: input },
        function (err, data) {
            if (err) {
                return console.log("Error Occurred:" + err);
            }
            var song = data.tracks.items[0];

            console.log("--------------------------------------");
            console.log("Artist: " + song.artists[0].name);
            fs.appendFileSync("log.txt", "Artist: " + song.artists[0] + "\n");
            console.log("Song Name: " + song.name);
            fs.appendFileSync("log.txt", "Song Name: " + song.name + "\n");
            console.log("Preview Song: " + song.preview_url);
            fs.appendFileSync("log.txt", "Preview Song: " + song.preview_url + "\n");
            console.log("Album: " + song.album.name);
            fs.appendFileSync("log.txt", "Album: " + song.album.name + "\n");
            console.log("--------------------------------------");

        }

    );

};

//function for movieinfo


function movieInfo(input) {
    if (input === "") {
        input = "Mr. Nobody";

        console.log("If you haven't watched 'Mr.Nobody', then you should:http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    var movieName = input;

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            console.log("--------------------------------------");
            console.log("Release Year: " + response.data.Year);
            console.log("Title: " + response.data.Title);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("--------------------------------------");
        })
}

//function for reading some random.txt file

function randomInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}