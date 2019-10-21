var Twit1 = require('twit');
var Twit2 = require('./new_twit');
require('dotenv').config();

const config = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
};

// const T = new Twit1(config);

var test = new Twit2(config);

test.streamTweets();

