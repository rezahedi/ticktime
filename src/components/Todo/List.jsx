import Item from "./Item";
import todoList from './dummyData'

function List() {

  return (
    <ul>
      {todoList.map(item => (
        <Item key={item.id} title={item.title} />
      ))}
    </ul>
  )
}

export default List