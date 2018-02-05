const take = require('zeelib/lib/take').default
const { uniqueById } = require('./util')
const limitPosts = (posts) => take(500, uniqueById(posts))

module.exports = class Cache {
  constructor (posts = []) {
    this.cache = posts
  }

  add (posts) {
    this.cache = limitPosts([ ...posts, ...this.cache ])
  }
}
