
export default function InputWithLabel(props) {
  const { title, handleTitleChange } = props;

  return (
    <>
      <label htmlFor="myInput">Add new todo</label>
      <input
        id="myInput" type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Ex: Do cleaning ..."
      />
    </>
  )
}
