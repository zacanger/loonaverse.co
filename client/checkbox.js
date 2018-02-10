import React from 'react'
import { string, func, bool } from 'prop-types'

const Checkbox = ({ platform, handleChange, checked }) => (
  <label htmlFor={platform}>
    <input type="checkbox" value={platform} checked={checked} onChange={handleChange} />
    {platform}
  </label>
)

Checkbox.propTypes = {
  platform: string.isRequired,
  handleChange: func.isRequired,
  checked: bool.isRequired
}

export default Checkbox
