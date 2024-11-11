import './App.css'
import List from './components/Todo/List'


const todoList = [
  {
    id: 1,
    title: "Complete weekly assignment"
  },
  {
    id: 2,
    title: "Read one chapter of a book"
  },
  {
    id: 3,
    title: "Learn one new thing daily"
  }
]

function App() {

  return (
    <div className="container">
      <h1>Tick Time</h1>
      <List items={todoList} />
    </div>
  )
}

export default App
