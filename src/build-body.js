/* eslint-disable camelcase */
const getTumblr = require('./apis/tumblr')
// const getTwitter = require('./apis/twitter')

const Cache = require('./cache')

const time1minute = 1000 * 60

const makeTumblrLinkList = (content) => {
  console.dir(content[0], { colors: true })
  return content.map((item) => `
    <li>
      <a href="${item.post_url}" target="_blank">${item.trail.content_raw}</a>
      <br><small><a href="https://${item.blog_name}.tumblr.com/" target="_blank">${item.blog_name}</a></small>
    </li>
  `)
}

const buildBody = async () => {
  const tumblrPosts = new Cache()

  setInterval(async () => {
    try {
      const newTumblr = await getTumblr('loona')
      tumblrPosts.add(newTumblr)
    } catch (e) {
      // assume we're being rate limited, for now
    }
  }, time1minute)

  // const twitterContent = await getTwitter('search/tweets', { q: 'loona' })
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <title>Loonaverse</title>
    <meta name="author" content="Zac Anger">
    <meta name="description" content="Social post aggregator for Loona content">
    <meta name="keywords" content="loona">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <meta charset="utf-8">
    <style type="text/css">
      body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      section {
        margin: 16px;
      }
    </style>
  </head>
  <body>
    <section>
      <h1>Tumblr</h1>
      <ul>${makeTumblrLinkList(tumblrPosts.cache).join('')}</ul>
    </section>
    <section>
      <h1>Twitter</h1>
        <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/hashtag/loona" data-widget-id="959887584640958464">#loona Tweets</a>
        <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
    </section>
  </body>
  </html>
`
}

module.exports = buildBody
