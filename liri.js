require("dotenv").config();
var keys = require("./keys.js");
const Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var nodeArgs = process.argv;
switch(command) {
    case 'concert-this':
        //var nodeArgs = process.argv;
        console.log("nodeArgs: " + nodeArgs);
        var artistName = nodeArgs.slice(3).join(" ");
        /*for(var i = 3; i < nodeArgs.length; i++) {
            if(i > 3 && i < nodeArgs.length) {
                artistName = artistName + "%20" + nodeArgs[i];
            } else {
                artistName += nodeArgs[i];
            }
        } */
        //var artistName = process.argv[3];
        console.log("artist to search for: " + artistName);
        searchBandsInTown(artistName);
        break;
    case 'spotify-this-song':
        console.log("nodeArgs: " + nodeArgs);
        var songInput = nodeArgs.slice(3).join(" ");
        console.log("song to search for: " + songInput);
        spotifyThisSong(songInput);
        break;
}

function searchBandsInTown(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log("queryURL is: " + queryURL);
    axios.get(queryURL).then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            console.log("Name of the venue: " + response.data[i].venue.name);
            console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Date of the Event: " + moment(response.data[i].datetime).format("L"));
        }
    })
    .catch(function(error) {
        if(error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });

}

function spotifyThisSong(song) {
    if(!song) {
        song = "The Sign Ace of Base";
    }

    spotify.search({type: "track", query: song}, function(err, data) {
        if(err) {
            console.log(err);
        }

        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song Name: " + songInfo[0].name);
        console.log("Preview Link (Spotify): " + songInfo[0].preview_url);
        console.log("Album: " + songInfo[0].album.name);
    });
}