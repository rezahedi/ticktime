import './style.css'

function AddNew() {
  return (
    <form className="add-new">
      <label htmlFor="myInput">Add new todo</label>
      <div>
        <input id="myInput" type="text" placeholder="Add new todo" />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddNew