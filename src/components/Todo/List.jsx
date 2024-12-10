import Item from "./Item";

function List( props ) {
  const { todoList } = props

  return (
    <div>
      {todoList && todoList.map(item => (
        <Item key={item.id} todoItem={item} />
      ))}
      {todoList.length === 0 && <p>No Todos, Yay!</p>}
    </div>
  )
}

export default List