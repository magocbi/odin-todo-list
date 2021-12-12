// only id and title required, other to be set later
function Todo(
  id,
  title,
  desc = null,
  dueDate = null,
  priority = null,
  notes = null,
  complete = false
) {
  function getId() {
    return id;
  }

  return { title, desc, dueDate, priority, notes, complete, getId };
}

export default Todo;
