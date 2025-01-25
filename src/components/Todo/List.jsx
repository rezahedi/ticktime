import Item from "./Item";
import styles from './List.module.css'

function List( props ) {
  const { todoList, onRemoveTodo } = props

  return (
    <div className={styles.list}>
      {todoList.map(item => (
        <Item key={item.id} todoItem={item} onRemoveTodo={onRemoveTodo} />
      ))}
      {todoList.length === 0 && <p className='empty-list'>No Todos, Yay!</p>}
    </div>
  )
}

export default List