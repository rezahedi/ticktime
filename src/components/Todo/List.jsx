import Item from "./Item";

function List({ items }) {

  return (
    <up>
      {items.map(item => (
        <Item key={item.id} title={item.title} />
      ))}
    </up>
  )
}

export default List