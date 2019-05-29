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










// const T2 = new Twit2({
//   consumer_key: 'VvrSVPxvNxadsc50ZcbG7Cngd',
//   consumer_secret: 'gyWZYsqpF2nrSDiN4k6TRms1pIUELSnttB54ipyd4QSs8EIth4',
//   access_token: '2568884475-IaYEYW3094ISQPKvm6fDapeRfCx7k2SrBfOykBC',
//   access_token_secret: 'OuPsQY5cp3nAxAGlqgmKLGBVUT7qga2r2B2oAlv6nIwhu',
//   timeout_ms: 60 * 1000,
//   strictSSL: true
// });

/* const a = T.stream('statuses/filter', { track: '@bbamii_' });


a.on('tweet', (tweet) => {
  console.log("User Name: ", tweet.user.name);
  console.log("handle: ", tweet.user.screen_name);
  console.log('-------------------------------')
  console.log('-------------------------------')
  console.log();
  console.log();
  
  function findTweetAndExtractText(tweet) {
    var currTweet = tweet;
    var { in_reply_to_status_id_str } = tweet;
    const data = {};
    let count = 0;
    console.log("id: ", currTweet.id_str);
    console.log("tweet: ", currTweet.text);
    
    
    function extract(id) {
      console.log("nxt:", id);
      var a = T.get('statuses/show/:id', { id });
      return a;
    }
    
    if (in_reply_to_status_id_str !== null) {
      var y = extract(in_reply_to_status_id_str)
        .then((e) => {
          console.log("e:", e.data.id_str);
          console.log("------");
          console.log();
          findTweetAndExtractText(e.data);
        });
      // console.log('str: ', y);
      // return tweet.text + ' ---- ' + findTweetAndExtractText(await extract(in_reply_to_status_id_str));
    } else {
      console.log("nahh");
    }
    // return tweet.text + '';
  }

  findTweetAndExtractText(tweet);
}) */







    /* T.post(
      'direct_messages/events/new',
      {
        "event": {
          "type": "message_create",
          "message_create": {
            "target": {
              "recipient_id": tweet.user.id,
            },
            "message_data": {
              "text": "Hello World!"
            }
          }
        }
      }
    )
    .then(() => console.log("DM Sent!!"))
    .catch(() => console.log("DM Failed!!")); */