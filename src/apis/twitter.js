const { twitter: twitterConfig } = require('../../config')
const Twitter = require('twitter')

const client = new Twitter(twitterConfig)

client.get('search/tweets', { q: 'loona' }, (err, tweets) => {
  if (err) throw err
  console.log(tweets)
})

client.stream('statuses/filter', { track: 'loona' }, (stream) => {
  stream.on('data', (tweet) => {
    console.log(tweet)
  })

  stream.on('error', (err) => {
    throw err
  })
})
