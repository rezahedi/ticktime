
/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem, onRemoveTodo } = props
  
  return (
    <div>
      <label>
        <input type="checkbox" />
        {todoItem.title}
        <button onClick={onRemoveTodo}>x</button>
      </label>
    </div>
  )
}

export default Item