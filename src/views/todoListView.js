const todoListView = (function () {
  let container;
  let todosContainer;
  let todoList;

  function initialize(viewContainer) {
    container = viewContainer;
    todosContainer = document.createElement('main');
    const projectTitle = document.createElement('h2');
    todoList = document.createElement('ul');
    todosContainer.append(projectTitle, todoList);
    container.append(todosContainer);
  }

  return { initialize };
})();

export default todoListView;
