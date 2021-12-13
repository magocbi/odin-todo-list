import eventAggregator from '../eventAggregator';
import todoItem from './todoItem';

const todoListView = (function () {
  let container;
  let todosContainer;
  let todoList;
  let projectTitle;

  function onTodosSelected({ name, filteredList }) {
    filteredList = filteredList.map(
      ({ getId, title, priority, desc, dueDate, completed }) =>
        todoItem(getId(), title, priority, desc, dueDate, completed)
    );
    todoList.append(...filteredList);
    projectTitle.textContent = name;
  }

  function initialize(viewContainer) {
    container = viewContainer;
    todosContainer = document.createElement('main');
    projectTitle = document.createElement('h2');
    todoList = document.createElement('ul');
    const addTodoBtn = document.createElement('button');
    addTodoBtn.type = 'button';
    addTodoBtn.textContent = 'Add Todo';
    todosContainer.append(projectTitle, todoList, addTodoBtn);
    container.append(todosContainer);

    eventAggregator.subscribe('todosSelected', onTodosSelected);
  }

  return { initialize };
})();

export default todoListView;
