require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./key");
var request = require('request');

var arg1 = process.argv[2];
var arg2 = process.argv[3];

function getTweets()
{
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'HungryBrian'};

    client.get('statuses/user_timeline', params, function(error, tweets, response)
    {
        if (!error)
        {
            for (let i = 0; i < 20; i++)
            {
                console.log("Date: ", tweets[i].created_at);
                console.log("Tweet: ", tweets[i].text);
            }
        }
        else
        {
            return console.log('Error occurred: ' + err);
        }
    });
}

function getSpotify()
{
    var spotify = new Spotify(keys.spotify);
    var songName = arg2;
    
    spotify.search({type: "track", query: songName, limit:5}, function(err, data)
    {
        if (!err)
        {
            console.log(data);
        }
        else
        {
            return console.log('Error occurred: ' + err);
        }
    });
}

switch (arg1)
{
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        getSpotify()
        break;
    case "movie-this":

        break;
    case "do-what-it-says":

        break;
    default:
        console.log("sorry liri-bot does not recognize your input")
};