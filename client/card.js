import React from 'react'
import { string } from 'prop-types'

const Card = ({
  author,
  authorUrl,
  content,
  platform,
  url,
}) => (
  <article>
    <small>{platform}</small>
    <a href={url} target="_blank">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </a>
    <br />
    <small>
      <a href={authorUrl} target="_blank">{author}</a>
    </small>
  </article>
)

Card.propTypes = {
  author: string.isRequired,
  authorUrl: string.isRequired,
  content: string.isRequired,
  platform: string.isRequired,
  url: string.isRequired
}

export default Card
