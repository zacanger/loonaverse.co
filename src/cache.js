const take = require('zeelib/lib/take').default

module.exports = class Cache {
  constructor (posts = []) {
    this.cache = posts
  }

  add (posts) {
    this.cache = take(500, [ ...posts, ...this.cache ])
  }
}
