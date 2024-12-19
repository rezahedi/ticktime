
/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem, onRemoveTodo } = props

  const handleRemoveClick = () => {
    onRemoveTodo(todoItem.id)
  }
  
  return (
    <div className='todo-item'>
      <label>
        <input type="checkbox" />
        <span>{todoItem.title}</span>
        <button onClick={handleRemoveClick}>x</button>
      </label>
    </div>
  )
}

export default Item