import { useRef, useEffect } from 'react'


export default function InputWithLabel(props) {
  const { children, title, handleTitleChange } = props;
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
