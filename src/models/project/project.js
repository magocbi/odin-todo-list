function Project(id, name, todoIdList = []) {
  function getId() {
    return id;
  }

  function deleteTodo(id) {
    const index = todoIdList.indexOf(id);
    if (index >= 0) todoIdList.splice(index, 1);
    return index;
  }

  function addTodo(id) {
    if (todoIdList.includes(id)) return null;
    todoIdList.push(id);
    return id;
  }

  function getTodoIdList() {
    return todoIdList;
  }

  return { getId, deleteTodo, addTodo, name, getTodoIdList };
}

export default Project;
