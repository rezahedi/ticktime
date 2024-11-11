import './App.css'
import List from './components/Todo/List'
import todoList from './components/Todo/dummyData'

function App() {

  return (
    <div className="container">
      <h1>Tick Time</h1>
      <List items={todoList} />
    </div>
  )
}

export default App
