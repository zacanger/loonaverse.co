const { consumer_key, consumer_secret } = require('../../config').tumblr // eslint-disable-line camelcase
const tumblr = require('tumblr.js')

const client = tumblr.createClient({ consumer_key, consumer_secret })
const promisify = require('zeelib/lib/promisify').default

module.exports = promisify(client.taggedPosts)
