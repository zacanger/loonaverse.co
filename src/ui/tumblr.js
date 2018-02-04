module.exports = (content) =>
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