
/* eslint-disable react/prop-types */
function Item({ todoItem }) {
  return (
    <div>
      <label>
        <input type="checkbox" />
        {todoItem.title}
      </label>
    </div>
  )
}

export default Item