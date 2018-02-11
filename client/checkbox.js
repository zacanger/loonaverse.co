import React from 'react'
import g from 'glamorous'
import { string, func, bool } from 'prop-types'

const Small = g.small({
  marginLeft: '8px',
  marginRight: '8px'
})

const Checkbox = ({ platform, handleChange, checked }) => (
  <Small>
    <label htmlFor={platform}>
      <input type="checkbox" value={platform} checked={checked} onChange={handleChange} />
      {platform}
    </label>
  </Small>
)

Checkbox.propTypes = {
  platform: string.isRequired,
  handleChange: func.isRequired,
  checked: bool.isRequired
}

export default Checkbox
