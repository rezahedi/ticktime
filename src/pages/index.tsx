import { useSearchParams } from 'react-router-dom'
import { TimelineView, ListView, TimelineViewSkeleton, ListViewSkeleton } from '../components/ListViews'
import { useData } from '../context/DataContext'
import AddNewOneLine from '../components/Todo/AddNewOneLine'

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view: string = searchParams.get('view')=='list' ? 'list' : 'timeline'

  const {todoList, isLoading, error, onDoneTodo, onRemoveTodo} = useData()

  const handleClick = () => {
    setSearchParams({
      view: (view=='timeline' ? 'list' : 'timeline')
    })
  }

  const renderView = () => {
    if (view == 'timeline')
      return isLoading ? <TimelineViewSkeleton /> : <TimelineView todoList={todoList} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} />
    return isLoading ? <ListViewSkeleton /> : <ListView todoList={todoList} onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} />
  }

  return (
    <>
      <AddNewOneLine />
      <button onClick={handleClick}>{view==='timeline' ? 'List View' : 'Timeline View'}</button>
      {error && <p className='error'>{error}</p>}
      {renderView()}
    </>
  )
}

export default Main