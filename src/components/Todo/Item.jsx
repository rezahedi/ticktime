
function Item({ todoItem }) {
  return (
    <li>
      <label>
        <input type="checkbox" />
        {todoItem.title}
      </label>
    </li>
  )
}

export default Item