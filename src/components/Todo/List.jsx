import Item from "./Item";
import todoList from './dummyData'

function List() {

  return (
    <up>
      {todoList.map(item => (
        <Item key={item.id} title={item.title} />
      ))}
    </up>
  )
}

export default List