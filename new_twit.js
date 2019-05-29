var Twit = require('twit');
require('dotenv').config();

class Twitt {
  // takes the twitter config as a constructor.
  constructor(twitterConfig) {
    this.tweetsArray = [];
    this.T = new Twit(twitterConfig);
    this.userid = '';
  }

  // extractTweetFromId(id: String) => <Promise>
  extractTweetFromId(id) {
    // console.log("nxt: ", id);
    return this.T.get('statuses/show/:id', { id });;
  }

  extractTextFromTweet(tweet) {
    return tweet.text;
  }

  streamTweets() {
    const s = this.T.stream('statuses/filter', { track: '@bbamii_' });

    s.on('tweet', (tweet) => {
      this.userid = tweet.user.id_str;
      this.compute(tweet);
    })
  }

  compute(tweet) {
    this.tweetsArray.push(tweet);
    if (tweet.in_reply_to_status_id_str !== null) {
      this.extractTweetFromId(tweet.in_reply_to_status_id_str)
        .then(e => this.compute(e.data))
        .catch(e => console.error(e));
    } else {
      this.sendDM(this.finishComputation())
        .then(e => console.log(`DM to user ${this.userid} has been sent!`))
        .catch(e => console.error(e))
        .finally(e => this.tweetsArray = []);
    }
  }

  sendDM(data) {
    return this.T.post(
      'direct_messages/events/new',
      {
        "event": {
          "type": "message_create",
          "message_create": {
            "target": {
              "recipient_id": this.userid,
            },
            "message_data": {
              "text": data
            }
          }
        }
      }
    )
  }

  finishComputation() {
    return this
      .tweetsArray
      .reverse()
      .map(this.extractTextFromTweet)
      .join('\n\n---\n\n');
  }
}

// export default Twitt;
module.exports = Twitt;