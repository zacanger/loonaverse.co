/* eslint-disable camelcase */

const oneMinute = 1000 * 60
// const fiveMinutes = oneMinute * 5
const Cache = require('./cache')
const getTumblr = require('./apis/tumblr')
const tumblrUi = require('./ui/tumblr')
const twitterUi = require('./ui/twitter')
const head = require('./ui/head')
const getTwitter = require('./apis/twitter')
const tags = require('./tags')

let tumblrs = require('./tumblr-seed.json')
let twitters = require('./twitter-seed.json')

const tumblrPosts = new Cache(tumblrs)
const twitterPosts = new Cache(twitters)

const buildTwitters = async () => {
  try {
    const res = await getTwitter.get('search/tweets', {
      q: 'loona',
      result_type: 'recent',
      count: 100
    })
    const twitters = res.statuses
    twitterPosts.add(twitters)
  } catch (err) {
    console.log('Error refreshing Twitter')
    console.trace(err)
  }
}

const buildTumblrs = async () => {
  try {
    tumblrs = await getTumblr(tags)
    tumblrPosts.add(tumblrs)
  } catch (err) {
    console.log('Error refreshing Tumblr')
    console.trace(err)
  }
}

setInterval(buildTumblrs, oneMinute)
setInterval(buildTwitters, oneMinute)

// i don't know where these extra tags are coming from.
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
