import { useRef, useEffect } from 'react'

interface InputWithLabelProps {
  children: React.ReactNode,
  title: string,
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function InputWithLabel({ children, title, handleTitleChange }: InputWithLabelProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if( inputRef.current )
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