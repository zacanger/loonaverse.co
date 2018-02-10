module.exports = (post) => `
  <article>
  <small>${post.platform}</small>
  <a href="${post.url}" target="_blank">${post.content}</a>
  <br>
  <small>
    <a href="${post.authorUrl}" target="_blank">${post.author}</a>
  </small>
</article>
`
