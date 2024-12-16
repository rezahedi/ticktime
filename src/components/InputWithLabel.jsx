
export default function InputWithLabel(props) {
  const { label, title, handleTitleChange } = props;

  return (
    <>
      <label htmlFor="myInput">{label}</label>
      <input
        id="myInput" type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Ex: Do cleaning ..."
      />
    </>
  )
}
