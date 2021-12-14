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

  function toggleComplete(e) {
    const btn = e.target;
    const id = btn.closest('[data-id]').dataset.id;
    btn.classList.toggle('completed');
    eventAggregator.publish('toggleCompletion', id);
  }

  function onDeleteTodo(e) {
    const id = e.target.closest('[data-id]').dataset.id;
    eventAggregator.publish('deleteTodo', id);
  }

  function onTodosSelected({ name, filteredList }) {
    resetList();
    filteredList = filteredList.map(
      ({ getId, title, priority, desc, dueDate, completed }) =>
        todoItem(
          getId(),
          title,
          toggleComplete,
          onDeleteTodo,
          priority,
          desc,
          dueDate,
          completed
        )
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

  function removeTodoItem(id) {
    [...todoList.children].find((todo) => todo.dataset.id === id)?.remove();
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
    eventAggregator.subscribe('todoDeleted', removeTodoItem);
  }

  return { initialize };
})();

export default todoListView;
