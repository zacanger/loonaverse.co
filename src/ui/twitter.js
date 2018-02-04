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
    return `
      <article>
        <small>twitter</small>
        <a href="${url}" target="_blank">${content}</a>
        ${user ? `
        <br>
        <small>
          <a href="https://twitter.com/${user}/" target="_blank">
            @${user}
          </a>
        </small>
      ` : ''}
      </article>
    `
  })
