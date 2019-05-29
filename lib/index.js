var Twit = require('./new_twit');
require('dotenv').config();

const config = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
};

var test = new Twit(config);

test.streamTweets({ track: '@bbamii_' });

