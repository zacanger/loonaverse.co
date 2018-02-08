/* eslint-disable camelcase */

const oneMinute = 1000 * 60
const flatten = require('zeelib/lib/flatten').default
const fiveMinutes = oneMinute * 5
const Cache = require('./cache')
const getTumblr = require('./apis/tumblr')
const tumblrUi = require('./ui/tumblr')
const twitterUi = require('./ui/twitter')
const head = require('./ui/head')
const getTwitter = require('./apis/twitter')
const tags = require('./tags')

const tumblrSeed = require('./tumblr-seed.json')
const twitterSeed = require('./twitter-seed.json')

const tumblrPosts = new Cache(tumblrSeed)
const twitterPosts = new Cache(twitterSeed)

const buildTwitters = async () => {
  try {
    const responses = await Promise.all(tags.twitter.map((tag) => getTwitter.get('search/tweets', {
      q: tag,
      result_type: 'recent',
      count: 100
    })))
    const newTwitters = flatten(responses.map(({ statuses }) => statuses))
    twitterPosts.add(newTwitters)
  } catch (err) {
    console.log('Error refreshing Twitter')
    console.trace(err)
  }
}

const buildTumblrs = async () => {
  try {
    const responses = await Promise.all(tags.tumblr.map((tag) => getTumblr(tag)))
    const newTumblrs = flatten(responses)
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
    ${tumblrPosts.cache && tumblrPosts.cache.length ? `
      <h1>tumblr</h1>
      <div class="section-wrapper">
        <section>
          ${tumblrUi(tumblrPosts.cache).join('')}
        </section>
      </div>
    ` : ''}
    ${twitterPosts.cache && twitterPosts.cache.length ? `
      <h1>twitter</h1>
      <div class="section-wrapper">
        <section>
          ${twitterUi(twitterPosts.cache).join('')}
        </section>
      </div>
    ` : ''}
  </main>
</body>
</html>
`
