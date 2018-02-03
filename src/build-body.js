const getTumblr = require('./apis/tumblr')
// const getTwitter = require('./apis/twitter')

const buildBody = async () => {
  const tumblrContent = await getTumblr('loona')
  // const twitterContent = await getTwitter('search/tweets', { q: 'loona' })
  return `
  <html><head><title>Loonaverse</title></head>
  <body><div>${JSON.stringify(tumblrContent)}</div></body></html>
  `
}

module.exports = buildBody
