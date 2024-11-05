import './App.css'


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
    <>
      <div className="container">
        <h1>Tick Time</h1>
        <ul>
          {todoList.map(item => (
            <li key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
