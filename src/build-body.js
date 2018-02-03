const getTumblr = require('./apis/get-tumblr')

const buildBody = async () => {
  const tumblrContent = await getTumblr('loona')
  return `
  <html><head><title>Loonaverse</title></head>
  <body><div>${JSON.stringify(tumblrContent)}</div></body></html>
  `
}

module.exports = buildBody
