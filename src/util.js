const stripStyleTags = (s = '') =>
  s.replace(/<\/?(b|i|em|strong)>/ig, '')

module.exports = {
  stripStyleTags
}
