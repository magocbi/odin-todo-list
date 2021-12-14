import eventAggregator from '../eventAggregator';
import todoEditForm from './todoEditForm';
import todoForm from './todoForm';
import todoItem from './todoItem';

const todoListView = (function () {
  let container;
  let todosContainer;
  let todoList;
  let projectTitle;
  let addForm;
  let addTodoBtn;
  let editForm;

  function closeForm() {
    addForm?.remove();
    editForm?.remove();
    addTodoBtn.classList.remove('hidden');
    for (let todo of todoList.children) {
      todo.classList.remove('hidden');
    }
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

  function onEditTodo(e) {
    const todo = e.target.closest('[data-id]');
    const id = todo.dataset.id;
    eventAggregator.publish('requestTodoData', id);
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
          onEditTodo,
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

  function onShowEditForm({ title, getId, desc, dueDate }) {
    closeForm();
    editForm = todoEditForm(
      { title, id: getId(), desc, dueDate },
      closeForm,
      closeForm
    );
    const position = [...todoList.children].findIndex(
      (todo) => todo.dataset.id === getId()
    );
    const todo = todoList.children[position];
    todoList.insertBefore(editForm, todo);
    todo.classList.add('hidden');
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
    eventAggregator.subscribe('todoDataSent', onShowEditForm);
  }

  return { initialize };
})();

export default todoListView;
