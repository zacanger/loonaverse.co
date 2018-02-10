import React, { Component } from 'react'
import { render } from 'react-dom'
import Card from './card'

const time1minute = 60 * 1000
const time5minutes = time1minute * 5

class App extends Component {
  interval

  state = {
    allPosts: [],
    displayPosts: []
  }

  static platforms = [ 'twitter', 'tumblr' ]

  componentWillMount () {
    this.update()
  }

  update = () => {
    window.fetch('/posts.json')
      .then((r) => r.json())
      .then((allPosts) => {
        this.setState({ allPosts, displayPosts: allPosts })
      })
  }

  componentDidMount () {
    this.interval = setInterval(this.update, time5minutes)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { displayPosts } = this.state
    return (
      <section>
        {displayPosts.map((post) => <Card key={post.id} {...post} />)}
      </section>
    )
  }
}

render(<App />, document.querySelector('main'))
