/* eslint-disable camelcase */

const oneMinute = 1000 * 60
const flatten = require('zeelib/lib/flatten').default
const fiveMinutes = oneMinute * 5
const Cache = require('./cache')
const getTumblr = require('./apis/tumblr')

const card = require('./ui/card')
const tumblrUi = require('./ui/tumblr')
const twitterUi = require('./ui/twitter')
const head = require('./ui/head')

const { sortByDate } = require('./util')
const getTwitter = require('./apis/twitter')
const tags = require('./tags')
const formatPost = require('./format-post')

const addPlatform = (platform) => (posts) => posts.map((p) => ({ __platform: platform, ...p }))
const addTwitter = addPlatform('twitter')
const addTumblr = addPlatform('tumblr')

const _tumblrSeed = require('./tumblr-seed.json')
const _twitterSeed = require('./twitter-seed.json')
const tumblrSeed = addTumblr(_tumblrSeed)
const twitterSeed = addTwitter(_twitterSeed)

const tumblrPosts = new Cache(tumblrSeed)
const twitterPosts = new Cache(twitterSeed)

const buildCards = (posts) => posts.map(card).join('')

const combinePosts = (...caches) => {
  const posts = []
  caches.forEach((cache) => {
    if (cache && cache.length) posts.push(...cache)
  })
  return sortByDate(posts.map(formatPost))
}

const buildEverything = (...caches) => buildCards(combinePosts(...caches))

const buildTwitters = async () => {
  try {
    const responses = await Promise.all(tags.twitter.map((tag) => getTwitter.get('search/tweets', {
      q: tag,
      result_type: 'recent',
      count: 100
    })))
    const newTwitters = addTwitter(flatten(responses.map(({ statuses }) => statuses)))
    twitterPosts.add(newTwitters)
  } catch (err) {
    console.log('Error refreshing Twitter')
    console.trace(err)
  }
}

const buildTumblrs = async () => {
  try {
    const responses = await Promise.all(tags.tumblr.map((tag) => getTumblr(tag)))
    const newTumblrs = addTumblr(flatten(responses))
    tumblrPosts.add(newTumblrs)
  } catch (err) {
    console.log('Error refreshing Tumblr')
    console.trace(err)
  }
}

buildTumblrs()
buildTwitters()
setInterval(buildTumblrs, fiveMinutes)
setInterval(buildTwitters, fiveMinutes)

module.exports = async () => `
<!doctype html>
<html lang="en">
${head}
 <body>
  <small>
    <span>
      a <a href="https://github.com/zacanger/loonaverse.co" target="_blank">work in progress</a>, by <a href="http://zacanger.com" target="_blank">zac anger</a>.
    <span>
  </small>
  <main>
  ${buildEverything(tumblrPosts.cache, twitterPosts.cache)}
  </main>
</body>
</html>
`
