const { stripStyleTags } = require('../util')

module.exports = (content) =>
  content.map((item) => {
    const user = (item.user && item.user.screen_name) || ''
    const text = item.text + '\n' || ''
    const hasImgs = item.extended_entities && item.extended_entities.media && item.extended_entities.media.length
    const imgs = hasImgs
      ? item.extended_entities.media.map((photo) => `<img alt="${user}'s photo" src="${photo.media_url_https}">`).join('')
      : ''
    const url = item.url || item.id_str ? `https://twitter.com/statuses/${item.id_str}` : ''
    const content = text + imgs

    const c = stripStyleTags(content)
    const author = stripStyleTags(user)
    return `
      <article>
        <!-- <small>twitter</small> -->
        <a href="${url}" target="_blank">${c}</a>
        ${user ? `
        <br>
        <small>
          <a href="https://twitter.com/${author}/" target="_blank">
            @${author}
          </a>
        </small>
      ` : ''}
      </article>
    `
  })
