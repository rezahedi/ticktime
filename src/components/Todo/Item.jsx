import styles from './Item.module.css'

/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem, onRemoveTodo } = props

  const handleRemoveClick = () => {
    onRemoveTodo(todoItem)
  }
  
  return (
    <div className={styles.item}>
      <span className={todoItem.temp ? styles.temporary : ''}>{todoItem.icon} {todoItem.title}</span>
      <button onClick={handleRemoveClick}>x</button>
    </div>
  )
}

export default Item