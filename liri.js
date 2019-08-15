require('dotenv').config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//user inputs
var command = process.argv[2];
var input = process.argv[3];

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
    }
}

//function for spotify this song

function songInfo(input) {
    if (input === undefined) {
        input = "The Sign";
    }
    spotify.search({ type: 'tracks', query: 'input' },
        function (err, data) {
            if (err) {
                return console.log('Error Occurred:' + err);
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artist: " + songs[i].artists[0].name);
                console.log("Song Name: " + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
            }
        }

    );

};


