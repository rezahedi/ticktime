import './style.css'

function AddNew({ onAddNew }) {

  const handleFormSubmission = (e) => {
    e.preventDefault()

    onAddNew( document.getElementById('myInput').value )
    e.target.reset()
  }

  return (
    <form className="add-new" onSubmit={handleFormSubmission}>
      <label htmlFor="myInput">Add new todo</label>
      <div>
        <input id="myInput" type="text" placeholder="Ex: 'Do cleaning ...'" />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddNew