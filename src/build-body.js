/* eslint-disable camelcase */
const getTumblr = require('./apis/tumblr')
// const getTwitter = require('./apis/twitter')

const Cache = require('./cache')

const time1minute = 1000 * 60

const makeTumblrLinkList = (content) =>
  content.map((item) => `
    <article>
      <a href="${item.post_url}" target="_blank">${item.trail.content_raw}</a>
      <br><small><a href="https://${item.blog_name}.tumblr.com/" target="_blank">${item.blog_name}</a></small>
    </article>
  `)

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
        padding: 16px;
        font-family: sans-serif;
        color: #36454F;
      }
      section {
        display: flex;
        padding: 8px;
        background-color: #fbfbfb;
        flex-direction: column;
        margin: 16px;
      }
      article {
        margin: 8px;
        box-shadow: 2px 2px 4px #999;
        transition: .2s ease-in-out transform, .2s ease-in-out box-shadow;
        display: flex;
        flex-direction: column;
        padding: 8px;
      }
      article:hover, article:active, article:focus {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
        transform: translate(1px, -3px);
      }
    </style>
  </head>
  <body>
    ${tumblrPosts.cache && tumblrPosts.cache.length
    ? `<section>
        <h1>Tumblr</h1>
        ${makeTumblrLinkList(tumblrPosts.cache).join('')}
      </section>
      ` : ''}
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
