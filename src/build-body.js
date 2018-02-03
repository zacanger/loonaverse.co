const getTumblr = require('./apis/tumblr')
// const getTwitter = require('./apis/twitter')

const Cache = require('./cache')

const time1minute = 1000 * 60

const makeTumblrLinkList = (content) =>
  content.map(({ post_url: url, slug }) =>
    `<li><a href="${url}" target="_blank">${slug}</a></li>`)

const buildBody = async () => {
  const tumblrContent = await getTumblr('loona')
  const tumblrPosts = new Cache(tumblrContent)

  setInterval(async () => {
    const newTumblr = await getTumblr('loona')
    tumblrPosts.add(newTumblr)
  }, time1minute)

  // const twitterContent = await getTwitter('search/tweets', { q: 'loona' })
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <title>Loonaverse</title>
    <meta charset="utf-8">
  </head>
  <body style="display: flex; flex-direction: row;">
    <section>
      <h1>Tumblr</h1>
      <ul>${makeTumblrLinkList(tumblrPosts.cache).join('')}</ul>
    </section>
    <section>
      <h1>Twitter</h1>
      <span>Twitter content will go here</span>
    </section>
  </body>
  </html>
`
}

module.exports = buildBody
