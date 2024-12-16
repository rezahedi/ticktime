import Item from "./Item";

function List( props ) {
  const { todoList, onRemoveTodo } = props

  return (
    <div>
      {todoList && todoList.map(item => (
        <Item key={item.id} todoItem={item} onRemoveTodo={() => onRemoveTodo(item.id)} />
      ))}
      {todoList.length === 0 && <p className='empty-list'>No Todos, Yay!</p>}
    </div>
  )
}

export default List