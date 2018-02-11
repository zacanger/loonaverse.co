import React, { Component, Fragment } from 'react'
import g from 'glamorous'
import Card from './card'
import Info from './info'
import Checkbox from './checkbox'

const Header = g.header({
  position: 'fixed',
  padding: '8px',
  background: 'white',
  zIndex: 3
})

const Section = g.section({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
})

const oneMinute = 60 * 1000
const platforms = [ 'twitter', 'tumblr' ]

class App extends Component {
  interval

  state = {
    posts: [],
    displaying: {
      twitter: true,
      tumblr: true
    }
  }

  componentWillMount () {
    this.updatePosts()
  }

  handleCheckboxChange = (e) => {
    const changing = e.target.value
    this.setState(({ displaying: prev }) => ({
      displaying: {
        ...prev,
        [changing]: !prev[changing]
      }
    }))
  }

  updatePosts = () => {
    window.fetch('/posts.json')
      .then((r) => r.json())
      .then((posts) => {
        this.setState({ posts })
      })
  }

  componentDidMount () {
    this.interval = setInterval(this.updatePosts, oneMinute)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { posts, displaying } = this.state
    const ps = posts.filter((p) => displaying[p.platform])
    return (
      <Fragment>
        <Header>
          <Info />
          {platforms.map((p) =>
            <Checkbox
              key={p}
              platform={p}
              handleChange={this.handleCheckboxChange}
              checked={displaying[p]}
            />
          )}
        </Header>
        <main>
          <Section>
            {ps.map((post) => <Card key={post.id} {...post} />)}
          </Section>
        </main>
      </Fragment>
    )
  }
}

export default App
