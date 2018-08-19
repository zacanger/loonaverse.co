import React from 'react'
import cxs from 'cxs/component'
import { string, func, bool } from 'prop-types'

const Small = cxs('small')({
  marginLeft: '8px',
  marginRight: '8px',
  userSelect: 'none'
})

const Label = cxs('label')({
  cursor: 'pointer'
})

const Checkbox = ({ platform, handleChange, checked }) => (
  <Small>
    <Label htmlFor={platform}>
      <input id={platform} type="checkbox" value={platform} checked={checked} onChange={handleChange} />
      {platform}
    </Label>
  </Small>
)

Checkbox.propTypes = {
  platform: string.isRequired,
  handleChange: func.isRequired,
  checked: bool.isRequired
}

export default Checkbox
