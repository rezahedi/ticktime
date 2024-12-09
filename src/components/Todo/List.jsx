import Item from "./Item";

function List({ todoList }) {

  return (
    <div>
      {todoList.length > 0 && todoList.map(item => (
        <Item key={item.id} todoItem={item} />
      ))}
      {todoList.length === 0 && <p>No Todos, Yay!</p>}
    </div>
  )
}

export default List