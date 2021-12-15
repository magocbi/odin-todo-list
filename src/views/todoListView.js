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

  function onShowEditTodo(e) {
    const todo = e.target.closest('[data-id]');
    const id = todo.dataset.id;
    eventAggregator.publish('requestTodoData', id);
  }

  function onTodosSelected({ name, filteredList }) {
    resetList();
    filteredList = filteredList.map(
      ({ getId, title, priority, desc, dueDate, complete }) =>
        todoItem(
          getId(),
          title,
          toggleComplete,
          onDeleteTodo,
          onShowEditTodo,
          priority,
          desc,
          dueDate,
          complete
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

  function onEditTodo(e) {
    e.preventDefault();
    const { title, desc, date } = editForm.elements;
    const id = editForm.dataset.editId;
    const data = {
      id,
      title: title.value,
      desc: desc.value,
      date: date.value,
    };
    eventAggregator.publish('editTodo', data);
  }

  function onShowEditForm({ title, getId, desc, dueDate }) {
    closeForm();
    editForm = todoEditForm(
      { title, id: getId(), desc, dueDate },
      onEditTodo,
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

  function editTodo({ id, title, desc, dueDate, priority, complete }) {
    const todo = [...todoList.children].find((todo) => todo.dataset.id === id);
    if (todo) {
      const newTodo = todoItem(
        id,
        title,
        toggleComplete,
        onDeleteTodo,
        onShowEditTodo,
        priority,
        desc,
        dueDate,
        complete
      );
      todoList.replaceChild(newTodo, todo);
    }
    closeForm();
    console.log(id, title, desc, dueDate, complete);
  }

  function initialize(viewContainer) {
    container = viewContainer;
    todosContainer = document.createElement('main');
    projectTitle = document.createElement('h2');
    todoList = document.createElement('ul');
    todoList.classList.add('todo-list');
    addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn');
    addTodoBtn.type = 'button';
    addTodoBtn.textContent = 'Add Todo';
    addTodoBtn.onclick = onAddTodo;
    todosContainer.append(projectTitle, todoList, addTodoBtn);
    container.append(todosContainer);

    eventAggregator.subscribe('todosSelected', onTodosSelected);
    eventAggregator.subscribe('todoFormDataSent', onShowTodoForm);
    eventAggregator.subscribe('todoDeleted', removeTodoItem);
    eventAggregator.subscribe('todoDataSent', onShowEditForm);
    eventAggregator.subscribe('todoEdited', editTodo);
  }

  return { initialize };
})();

export default todoListView;
