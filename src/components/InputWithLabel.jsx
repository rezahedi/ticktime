import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function InputWithLabel({ children, title, handleTitleChange }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if( inputRef?.current )
      inputRef.current.focus()
  })

  return (
    <>
      <label htmlFor="myInput">{children}</label>
      <input
        id="myInput" type="text"
        ref={inputRef}
        value={title}
        onChange={handleTitleChange}
        required={true}
        placeholder="Ex: Do cleaning ..."
      />
    </>
  )
}
InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
}