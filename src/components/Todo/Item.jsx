
/* eslint-disable react/prop-types */
function Item( props ) {
  const { todoItem } = props
  
  return (
    <div>
      <label>
        <input type="checkbox" />
        {todoItem.title}
      </label>
    </div>
  )
}

export default Item