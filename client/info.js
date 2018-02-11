import React from 'react'
import g from 'glamorous'

const A = g.a({
  ':hover,:active,:focus': {
    textDecoration: 'underline'
  }
})
const Info = () => (
  <small>
    <span>
      Loonaverse is a
      {' '}<A href="https://github.com/zacanger/loonaverse.co" target="_blank">free software project</A>
      {' '}by <A href="http://zacanger.com" target="_blank">zac anger</A>
    </span>
  </small>
)

export default Info
