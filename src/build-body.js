/* eslint-disable camelcase */
const getTumblr = require('./apis/tumblr')
// const getTwitter = require('./apis/twitter')

const Cache = require('./cache')

const fiveMinutes = 1000 * 60 * 5

const makeTumblrLinkList = (content) =>
  content.map((item) => {
    const contentRaw = item.trail && item.trail[0] && item.trail[0].content_raw
    const innerPost = contentRaw && contentRaw.split('[[MORE]]')[0] // Read More link
    const content = item.type === 'video'
      ? item.player && item.player[0] && item.player[0].embed_code
      : item.type === 'photo'
        ? item.photos.map((photo) => `<img alt="${item.blog_name}'s photo" src="${photo.original_size.url}">`).join('')
        : innerPost
    return `
      <article>
        <a href="${item.post_url}" target="_blank">${content}</a>
        <br>
        <small>
          <a href="https://${item.blog_name}.tumblr.com/" target="_blank">
            ${item.blog_name}
          </a>
        </small>
      </article>
    `
  })

const buildBody = async () => {
  const tumblrPosts = new Cache(require('./response'))

  setInterval(async () => {
    try {
      const newTumblr = await getTumblr('loona')
      tumblrPosts.add(newTumblr)
    } catch (e) {
      // assume we're being rate limited, for now
    }
  }, fiveMinutes)

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
      html {
        background-color: #fbfbfb;
      }
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
        max-width: 300px;
      }
      article:hover, article:active, article:focus {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
        transform: translate(1px, -3px);
      }
      article img {
        max-width: 80%;
      }
      article a {
        text-decoration: none;
        color: #454f3e;
      }
      article small {
        text-align: right;
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
