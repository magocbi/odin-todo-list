import eventAggregator from '../eventAggregator';
import todoForm from './todoForm';
import todoItem from './todoItem';

const todoListView = (function () {
  let container;
  let todosContainer;
  let todoList;
  let projectTitle;
  let addForm;
  let addTodoBtn;

  function closeForm() {
    addForm?.remove();
    addTodoBtn.classList.remove('hidden');
  }

  function resetList() {
    while (todoList.firstChild) {
      todoList.firstChild.remove();
    }
  }

  function onTodosSelected({ name, filteredList }) {
    resetList();
    filteredList = filteredList.map(
      ({ getId, title, priority, desc, dueDate, completed }) =>
        todoItem(getId(), title, priority, desc, dueDate, completed)
    );
    todoList.append(...filteredList);
    projectTitle.textContent = name;
    closeForm();
  }

  function onShowTodoForm({ selectedId, projectList }) {
    closeForm();
    addForm = todoForm(projectList, selectedId, closeForm);
    todosContainer.append(addForm);
    addTodoBtn.classList.add('hidden');
  }

  function onAddTodo(e) {
    eventAggregator.publish('todoFormDataRequired', null);
  }

  function initialize(viewContainer) {
    container = viewContainer;
    todosContainer = document.createElement('main');
    projectTitle = document.createElement('h2');
    todoList = document.createElement('ul');
    todoList.classList.add('todo-list');
    addTodoBtn = document.createElement('button');
    addTodoBtn.type = 'button';
    addTodoBtn.textContent = 'Add Todo';
    addTodoBtn.onclick = onAddTodo;
    todosContainer.append(projectTitle, todoList, addTodoBtn);
    container.append(todosContainer);

    eventAggregator.subscribe('todosSelected', onTodosSelected);
    eventAggregator.subscribe('todoFormDataSent', onShowTodoForm);
  }

  return { initialize };
})();

export default todoListView;
