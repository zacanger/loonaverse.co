/* eslint-disable camelcase */

const fiveMinutes = 1000 * 60 * 5
const Cache = require('./cache')
const getTumblr = require('./apis/tumblr')
const makeTumblrLinkList = require('./ui/tumblr')
const head = require('./ui/head')
// const getTwitter = require('./apis/twitter')

let tumblrs = require('./response')

const tumblrPosts = new Cache(tumblrs)

const buildTumblrs = async () => {
  try {
    tumblrs = await getTumblr('loona')
  } catch (_) {
    // assume rate limiting
  }
  tumblrPosts.add(tumblrs)
}

setInterval(buildTumblrs, fiveMinutes)

module.exports = async () => {
  // const twitterContent = await getTwitter('search/tweets', { q: 'loona' })
  return `
  <!doctype html>
  <html lang="en">
  ${head}
   <body>
    <small>
      <span>a work in progress. <a href="https://github.com/zacanger/loonaverse.co" target="_blank">code</a><span>
    </small>
    <main>
      <div class="section-wrapper">
      ${tumblrPosts.cache && tumblrPosts.cache.length ? `
        <section>
          <h1>Tumblr</h1>
          ${makeTumblrLinkList(tumblrPosts.cache).join('')}
        </section>
      ` : ''}
      </div>
      <div class="section-wrapper">
        <section>
          <h1>Twitter</h1>
            <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/hashtag/loona" data-widget-id="959887584640958464">#loona Tweets</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
        </section>
      </div>
    </main>
  </body>
  </html>
`
}
