
export default function InputWithLabel(props) {
  const { children, title, handleTitleChange } = props;

  return (
    <>
      <label htmlFor="myInput">{children}</label>
      <input
        id="myInput" type="text"
        value={title}
        onChange={handleTitleChange}
        autoFocus={true}
        required={true}
        placeholder="Ex: Do cleaning ..."
      />
    </>
  )
}
