import Item from "../Todo/Item";
import styles from './ListView.module.css'
import { TodoProps } from "../../lib/types";
import Sort from "./Sort";

interface ListProps {
  todoList: TodoProps[],
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function ListView({ todoList, onRemoveTodo }: ListProps) {

  return (
    <>
      <div className={styles.sortButtons}>
        <Sort title='Title' />
        <Sort title='Deadline' />
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

export default ListView