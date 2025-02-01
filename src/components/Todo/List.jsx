import Item from "./Item";
import styles from './List.module.css'
import PropTypes from "prop-types";
import { todoObjType } from "../../propTypes";

function List({ todoList, onRemoveTodo }) {

  return (
    <div className={styles.list}>
      {todoList.map(item => (
        <Item key={item.id} todoItem={item} onRemoveTodo={onRemoveTodo} />
      ))}
      {todoList.length === 0 && <p className='empty-list'>No Todos, Yay!</p>}
    </div>
  )
}
List.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape(todoObjType)).isRequired,
  onRemoveTodo: PropTypes.func.isRequired
}

export default List