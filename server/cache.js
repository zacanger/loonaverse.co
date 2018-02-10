const take = require('zeelib/lib/take').default
const { sortByDate, uniqueById } = require('./util')
const maxPosts = 1000
const limitPosts = (posts) => take(maxPosts, uniqueById(posts))

module.exports = class Cache {
  constructor (posts = []) {
    this.posts = posts
  }

  add (posts) {
    const newPosts = sortByDate(limitPosts([ ...posts, ...this.posts ]))
    this.posts = newPosts
  }
}
