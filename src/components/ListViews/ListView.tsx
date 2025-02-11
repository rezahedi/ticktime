import Item from "../Todo/Item";
import styles from './ListView.module.css'
import { TodoProps } from "../../lib/types";
import Sort from "./Sort";
import Empty from "./Timeline/Empty";

interface ListProps {
  todoList: TodoProps[],
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function ListView({ todoList, onRemoveTodo }: ListProps) {

  if (todoList.length === 0)
    return <Empty />

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
      </div>
    </>
  )
}

export default ListView