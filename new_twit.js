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
    return this.T.get('statuses/show/:id', { id });;
  }

  // extractTextFromTweet(tweet: Object) => <String>
  extractTextFromTweet(tweet) {
    return tweet.text;
  }

  // streamTweets(filter: Object) => void
  // <process>
  // This function starts a streaming service
  streamTweets(filter) {
    const s = this.T.stream('statuses/filter', filter);

    s.on('tweet', (tweet) => {
      this.userid = tweet.user.id_str;
      this.getThread(
        tweet,
        this.sendDM(
            this.tweetsArray.reverse().map(this.extractTextFromTweet).join('\n\n---\n\n'),
            this.userid
          )
          .then(e => console.log(`DM to user ${this.userid} has been sent!`))
          .catch(e => console.error(e))
          .finally(e => this.tweetsArray = [])
      );
    })
  }

  // getThread(tweet: Object, cb: Function) => void
  // This function gets the parent's tweet from the 
  // TWEET variable, & calls a callback <cb> function
  // when it's done.
  getThread(tweet, cb) {
    this.tweetsArray.push(tweet);
    if (tweet.in_reply_to_status_id_str !== null) {
      this.extractTweetFromId(tweet.in_reply_to_status_id_str)
        .then(e => this.getThread(e.data))
        .catch(e => console.error(e));
    } else {
      cb;
    }
  }

  // sendDM(data: String, id: String) => <Promise>
  sendDM(data, id) {
    return this.T.post(
      'direct_messages/events/new',
      {
        "event": {
          "type": "message_create",
          "message_create": {
            "target": {
              "recipient_id": id,
            },
            "message_data": {
              "text": data
            }
          }
        }
      }
    )
  }

  // computeTweetTree(data: Arrat, cb: Function) => void;

  computeTweetTree(data, cb) {
    cb(data);
  }
}

// export default Twitt;
module.exports = Twitt;