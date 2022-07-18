import React from 'react'

const InputNote = ({value, onChange, onKeyDown}) => {
  return (
    <input
           value={value}
           onChange={onChange}
           onKeyDown={onKeyDown}
           placeholder='Type here...'
    />
  )
}

export default InputNote