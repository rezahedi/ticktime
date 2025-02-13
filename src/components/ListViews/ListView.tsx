import Item from "../Todo/Item";
import styles from './ListView.module.css'
import { TodoProps } from "../../lib/types";
import Sort from "./Sort";
import Empty from "./Timeline/Empty";

interface ListProps {
  todoList: TodoProps[],
  onDoneTodo: (todo: TodoProps) => Promise<boolean>,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

function ListView({ todoList, onDoneTodo, onRemoveTodo }: ListProps) {

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
          <Item key={item.id} todoItem={item} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} />
        ))}
      </div>
    </>
  )
}

export default ListView