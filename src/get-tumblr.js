const { consumer_key, consumer_secret } = require('../config') // eslint-disable-line camelcase
const tumblr = require('tumblr.js')

const client = tumblr.createClient({ consumer_key, consumer_secret })

client.taggedPosts('loona', (err, body) => {
  if (err) throw err
  console.dir(body.length, { colors: true })
})
