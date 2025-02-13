import { calculateRemainedDays } from "../../lib/dates"
import { TodoProps } from "../../lib/types"
import styles from './TimelineView.module.css'
import TimeBlock from "./Timeline/TimeBlock"
import Empty from "./Timeline/Empty"

interface ListProps {
  todoList: TodoProps[],
  onDoneTodo: (todo: TodoProps) => Promise<boolean>,
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
}

export const TimelineView = ({ todoList, onDoneTodo, onRemoveTodo }: ListProps) => {

  const pastDueTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days<0
  })

  const todayTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days===0
  })

  // const completedTodayTodos = todoList.filter(todo => {
  //   const days = calculateRemainedDays(todo.deadline)
  //   return todo.completedAt && days===0
  // })

  const comingTodos = todoList.filter(todo => {
    const days = calculateRemainedDays(todo.deadline)
    return !todo.completedAt && days>=1
  })

  const allCompletedTodos = todoList.filter(todo => {
    return todo.completedAt
  })

  return (
    <div className={styles.wrapper}>
      {todoList.length===0 && <Empty />}
      {todoList.length>0 &&
        <>
          <TimeBlock title='Past Due' color='#DC3545' todos={pastDueTodos} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo}>
          💀 {pastDueTodos.length} passed due items, click to see them.
          </TimeBlock>
          <TimeBlock title="Today" color="#28A745" todos={todayTodos} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} showEmpty />
          <TimeBlock title='Coming Up' color='#FFD700' todos={comingTodos} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} />
          <TimeBlock title='Completed' color='#B0BEC5' todos={allCompletedTodos} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo}>
            🎉 {allCompletedTodos.length} todos done so far, click to see them.
          </TimeBlock>
        </>
      }
    </div>
  )
}

export default TimelineView