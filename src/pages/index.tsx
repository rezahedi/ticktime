import { TimelineView, ListView, TimelineViewSkeleton, ListViewSkeleton } from '../components/ListViews'
import AddNew from '../components/Todo/AddNew'
import { useData } from '../context/DataContext'

const Main = () => {

  const {todoList, isLoading, error, onRemoveTodo} = useData()

  return (
    <>
      <AddNew navigateToHome={false} />
      {isLoading && 
        <TimelineViewSkeleton />
        // <ListViewSkeleton />
      }
      {error && <p className='error'>{error}</p>}
      {!isLoading &&
        <TimelineView todoList={todoList} onRemoveTodo={onRemoveTodo} />
        // <ListView todoList={todoList} onRemoveTodo={onRemoveTodo} />
      }
    </>
  )
}

export default Main