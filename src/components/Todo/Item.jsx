
function Item({ title }) {
  return (
    <li>
      <label>
        <input type="checkbox" />
        {title}
      </label>
    </li>
  )
}

export default Item