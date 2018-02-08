const take = require('zeelib/lib/take').default
const { uniqueById } = require('./util')
const maxPosts = 500
const limitPosts = (posts) => take(maxPosts, uniqueById(posts))

module.exports = class Cache {
  constructor (posts = []) {
    this.cache = posts
  }

  add (posts) {
    this.cache = limitPosts([ ...posts, ...this.cache ])
  }
}
