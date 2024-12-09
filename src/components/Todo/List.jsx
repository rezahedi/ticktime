import Item from "./Item";
import todoList from './dummyData'

function List() {

  return (
    <div>
      {todoList.map(item => (
        <Item key={item.id} todoItem={item} />
      ))}
    </div>
  )
}

export default List