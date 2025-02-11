import { useSearchParams } from 'react-router-dom'
import { TimelineView, ListView, TimelineViewSkeleton, ListViewSkeleton } from '../components/ListViews'
import AddNew from '../components/Todo/AddNew'
import { useData } from '../context/DataContext'

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view: string = searchParams.get('view')=='list' ? 'list' : 'timeline'

  const {todoList, isLoading, error, onRemoveTodo} = useData()

  const handleClick = () => {
    setSearchParams({
      view: (view=='timeline' ? 'list' : 'timeline')
    })
  }

  const renderView = () => {
    if (view == 'timeline')
      return isLoading ? <TimelineViewSkeleton /> : <TimelineView todoList={todoList} onRemoveTodo={onRemoveTodo} />
    return isLoading ? <ListViewSkeleton /> : <ListView todoList={todoList} onRemoveTodo={onRemoveTodo} />
  }

  return (
    <>
      <AddNew navigateToHome={false} />
      <button onClick={handleClick}>{view==='timeline' ? 'List View' : 'Timeline View'}</button>
      {error && <p className='error'>{error}</p>}
      {renderView()}
    </>
  )
}

export default Main