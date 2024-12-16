
/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem, onRemoveTodo } = props
  
  return (
    <div className='todo-item'>
      <label>
        <input type="checkbox" />
        <span>{todoItem.title}</span>
        <button onClick={onRemoveTodo}>x</button>
      </label>
    </div>
  )
}

export default Item