import React from 'react'

const InputNote = ({value, setInpValue, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(e) => setInpValue(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}

export default InputNote