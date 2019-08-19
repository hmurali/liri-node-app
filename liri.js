require("dotenv").config();
var fs = require("fs");
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
        //console.log("nodeArgs: " + nodeArgs);
        var artistName = nodeArgs.slice(3).join(" ");
        /*for(var i = 3; i < nodeArgs.length; i++) {
            if(i > 3 && i < nodeArgs.length) {
                artistName = artistName + "%20" + nodeArgs[i];
            } else {
                artistName += nodeArgs[i];
            }
        } */
        //var artistName = process.argv[3];
        //console.log("artist to search for: " + artistName);
        searchBandsInTown(artistName);
        break;
    case 'spotify-this-song':
        //console.log("nodeArgs: " + nodeArgs);
        var songInput = nodeArgs.slice(3).join(" ");
        //console.log("song to search for: " + songInput);
        spotifyThisSong(songInput);
        break;
    case 'movie-this':
        //console.log("nodeArgs: " + nodeArgs);
        var movieInput = nodeArgs.slice(3).join(" ");
        //console.log("movie to search for: " + movieInput);
        movieThis(movieInput);
        break;
    case 'do-what-it-says':
        simonSays();
        break;
}

function searchBandsInTown(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //console.log("queryURL is: " + queryURL);
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

function movieThis(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=trilogy";
    //console.log("queryURL is: " + queryURL);
    if(!movie) {
        movie = "Mr Nobody";
        queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=trilogy";
        //console.log("Mr. Nobody query url: " + queryURL);
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/" + "\n" + "It's on Netflix!");
    }
    axios.get(queryURL).then(function(response) {
        console.log("Title of the movie: " + response.data.Title);
        console.log("Year the movie came out: " + response.data.Year);
        console.log("IMDB rating of the movie: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + response.data.Country);
        console.log("Language of the movie: " + response.data.Language);
        console.log("Plot of the movie: " + response.data.Plot);
        console.log("Actors in the movie: " + response.data.Actors);
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

function simonSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }

        //console.log(data);
        var dataArr = data.split(",");
        spotifyThisSong(dataArr[1]);
    })
};