const { twitter: twitterConfig } = require('../../config')
const Twitter = require('twitter')

const client = new Twitter(twitterConfig)

client.get('search/tweets', { q: 'loona' }, (err, tweets) => {
  if (err) throw err
  console.log(tweets)
})
