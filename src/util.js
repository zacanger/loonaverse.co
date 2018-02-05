const stripStyleTags = (s = '') =>
  s.replace(/<\/?(b|i|em|strong)>/ig, '')

const uniqueById = (xs) =>
  xs.filter((e, i) => xs.findIndex((a) => a.id === e.id) === i)

module.exports = {
  stripStyleTags,
  uniqueById
}
