import React from "react";
import ReactDOM from "react-dom";
module.exports = require('./lib/Twitter');
twttr.widgets.load( document.getElementbyId("index.html") );

// Initializing the twitter API
var express = require('express');
var OAuth2 = require('oauth').OAuth2; 
var https = require('https');
var app = express();
var bodyParser = require('body-parser');

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-js-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": "LZ3zo5DdGqaUYAh4mgHSXipwy",
    "consumerSecret": "	Ry7qwUBEeJ08CQv5IfDWGUMT31EgR1YgGFTgKeluhaDwFrP2sJ",
    "accessToken": "356514451-7EgYCJhVDkSfDoZ9L5wkrloNH19mQcUOhnyi5No4",
    "accessTokenSecret": "	pP97y5CBEbjFLvgbwUPqNFzfRsCcan93knFIG5jnDi8ta",
    "callBackUrl": "https:://google.com"
}

var twitter = new module.exports.Twitter(config);
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Server running on port ' + port);
});

var token = null;
var oauth2 = new OAuth2(config.consumerKey, config.consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);
oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
  }, function (e, access_token) {
        token = access_token;
});

//unauthenticated request
app.post('/twitter/user', function (req, res) {
    var username = req.body.username;
    var data = twitter.getUser({ screen_name: username}, function(error, response, body){
        res.send({
            "error" : error
        });
    }, function(data){
        res.send({
            result : {
                "userData" : data
            }
        });
    });

});

//authenticated request
app.post('/twitter/user/github', function (req, res) {
        var username = req.body.username;
        var options = {
            hostname: 'api.twitter.com',
                    //this path will search for tweets from specified user 
                    //with "github" mentioned in them
            path: '/1.1/search/tweets.json?q=github%3A' + username,
            headers: {
                Authorization: 'Bearer ' + token
            }
        };

        https.get(options, function(result){
          var buffer = '';
          result.setEncoding('utf8');
          result.on('data', function(data){
            buffer += data;
          });
          result.on('end', function(){
            var tweets = JSON.parse(buffer);
            res.send(tweets);
          });
        });

});



class UndecissiveButton extends React.Component 
{
  constructor(props) {
    super(props);

    this.changeMe = this.changeMe.bind(this);

    this.state = {
      mad: false
    }
  }

  changeMe() 
  {
    if(this.state.mad) {
      this.setState({mad:false});
    } else {
      this.setState({mad:true});
    }
  }

  render() 
  {
    if(this.state.mad) 
    {
      var color = {backgroundColor:"blue"};
    } else 
    {
      var color = {backgroundColor:"white"};
    }

    return (<button style={color} className = "undecissive-button" onClick={this.changeMe}>Search!</button>);
  }
}

ReactDOM.render(<UndecissiveButton />, document.getElementById("app"));
