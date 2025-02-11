import React, { useState } from 'react'
import { TodoProps } from '../../../lib/types'
import Item from '../../Todo/Item'
import styles from '../TimelineView.module.css'
import itemStyles from '../../Todo/Item.module.css'
import Empty from './Empty'
import Hooray from './Hooray'

interface TimeBlockProps {
  title: string,
  color: string,
  todos: TodoProps[],
  onRemoveTodo: (todo: TodoProps) => Promise<void>,
  showEmpty?: boolean,
  children?: React.ReactNode,
}
const TimeBlock = (props: TimeBlockProps) => {
  const { title, color, todos, onRemoveTodo, showEmpty, children } = props
  const isCollapsible = children ? true : false;
  const [expand, setExpand] = useState<boolean>(false)

  const handleClick = () => {
    if (isCollapsible)
      setExpand(true)
  }

  if(!showEmpty && todos.length===0) return;

  return (
    <div className={styles.timeBlock} style={{borderColor:color}}>
      <h3 style={{color:color}}>
        {title}
        {/* TODO: add today's date like: <i>3 Mar</i> */}
      </h3>
      <div className={styles.timeContent}>
        {isCollapsible && !expand &&
          <div className={itemStyles.item} onClick={handleClick}>
            <span>{children}</span>
          </div>
        }
        {(!isCollapsible || expand) &&
          <>
            {todos.map(todo => 
              <Item key={todo.id} todoItem={todo} onRemoveTodo={onRemoveTodo} />
            )}
            {showEmpty && todos.length===0 && <Hooray />}
          </>
        }
      </div>
    </div>
  )
}

export default TimeBlock