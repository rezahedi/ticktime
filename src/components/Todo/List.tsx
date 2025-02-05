import Item from "./Item";
import styles from './List.module.css'
import { TodoProps } from "../../lib/types";
import Sort from "./Sort";

interface ListProps {
  todoList: TodoProps[],
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function List({ todoList, onRemoveTodo }: ListProps) {

  return (
    <>
      <div className={styles.sortButtons}>
        <Sort title='Title' />
        <Sort title=' Date' />
      </div>
      <div className={styles.list}>
        {todoList.map(item => (
          <Item key={item.id} todoItem={item} onRemoveTodo={onRemoveTodo} />
        ))}
        {todoList.length === 0 && <p className='empty-list'>No Todos, Yay!</p>}
      </div>
    </>
  )
}

export default List