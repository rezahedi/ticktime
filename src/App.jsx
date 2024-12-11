import './App.css'
import List from './components/Todo/List'
import AddNew from './components/Todo/AddNew'
import useSemiPersistentState from './hooks/useSemiPersistentState'

function App() {

  const [todoList, setTodoList] = useSemiPersistentState()

  const addTodo = (newTodo) => {
    setTodoList((prevData) => [...prevData, {id: Date.now(), title: newTodo} ])
  }

  return (
    <div className="container">
      <h1>Tick Time</h1>
      <AddNew onAddNew={addTodo} />
      <List todoList={todoList} />
    </div>
  )
}

export default App
