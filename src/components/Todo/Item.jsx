import styles from './Item.module.css'

/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem, onRemoveTodo } = props

  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }
  
  return (
    <div className={styles.item}>
      <label>
        <input type="checkbox" />
        <span className={todoItem.temp ? 'italic' : ''}>{todoItem.title}</span>
        <button onClick={handleRemoveClick}>x</button>
      </label>
    </div>
  )
}

export default Item