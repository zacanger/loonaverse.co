import React, { Component } from 'react'
import { render } from 'react-dom'
import Card from './card'

class App extends Component {
  state = {
    posts: []
  }

  componentWillMount () {
    window.fetch('/posts.json')
      .then((r) => r.json())
      .then((posts) => {
        this.setState({ posts })
      })
  }

  render () {
    return (
      <section>
        {this.state.posts.map((post) => <Card key={post.id} {...post} />)}
      </section>
    )
  }
}

render(<App />, document.querySelector('main'))
