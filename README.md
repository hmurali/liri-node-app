# liri-node-app
## Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line Node.js app that takes in parameters and passes back data based on those parameters. LIRI searches Spotify for songs, BandsInTown concerts, and OMDB for movies.

Using `.gitignore`, API keys are stored locally and kept safe through abstraction by `.env`, having users instead provide their own API keys if they intend to use the app.

## Packages/APIs Required
**Packages/APIs used:**
* [Node.js] (https://nodejs.org/en/)
* [Node-File-System] (https://nodejs.org/api/fs.html)
* [Axios] (https://www.npmjs.com/package/axios)
* [DotEnv] (https://www.npmjs.com/package/dotenv)
* [JavaScript] (https://www.javascript.com/)
* [Moment.js] (https://www.npmjs.com/package/moment)
* [OMDB-API] (http://www.omdbiapi.com)
* [BandsInTown-API] (http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)

## Commands
1. `node liri.js concert-this <artist/band-name>`
    1. This command searches the Bands in Town Artist Events API through Axios (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) and returns events the artist is appearing at or in the near future. It includes `Name of the venue: `, `Venue Location: `, and `Date of the Event: `.
2. `node liri.js spotify-this-song <song-name>`
    1. This command searches the Spotify Web API that runs on Node.js (`spotify.search({type: "track", query: song}, function(err, data)`) and returns information about the song entered in by the user. It includes `Artist(s): `, `Song Name: `, `Preview Link (Spotify): `, and `Album: `. If no song is entered, the API automatically searches "The Sign" by Ace of Base for the user.
3. `node liri.js movie-this <movie-name>`
    1. This command searches the OMDB API through Axios (`"http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=trilogy"`) and returns information about the movie the user input. It includes `Title of the movie: `, `Year the movie came out: `, `IMDB rating of the movie: `, `Rotten Tomatoes Rating of the movie: `, `Country where the movie was produced: `, `Language of the movie: `, `Plot of the movie: `, and `Actors in the movie: `. If no movie is entered, the API automatically searches Mr. Nobody for the user, as well as letting them know that they should check it out, notifying the user that it's on Netflix, and providing a link to the IMDB page for the movie.
4. `node liri.js do-what-it-says`
    1. Using the `fs` Node package, LIRI accesses the text in random.txt and uses that to call one of LIRI's commands for the user. It runs `spotify-this-song` for "I Want it That Way" by the Backstreet Boys, but can also be modified to search for a specific movie for movie-this, or a specific artist for concert-this.
