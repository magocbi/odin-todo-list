function todoItem(
  id,
  title,
  toggleComplete,
  onDeleteTodo,
  priority,
  desc = '',
  dueDate = null,
  completed = false
) {
  const todo = document.createElement('li');
  todo.classList.add('todo-item');
  todo.dataset.id = id;

  const header = document.createElement('div');
  header.classList.add('todo-header');
  const completeBtn = document.createElement('button');
  completeBtn.type = 'button';
  completeBtn.classList.add('complete-toggle-btn');
  // &#10003;
  completeBtn.textContent = completed ? '&#10003;' : '';
  if (completed) completeBtn.classList.add('completed');
  completeBtn.onclick = toggleComplete;
  const todoTitle = document.createElement('h3');
  todoTitle.textContent = title;
  todoTitle.classList.add('todo-title');
  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.textContent = 'Edit';
  editBtn.classList.add('success-btn');
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = '-';
  deleteBtn.classList.add('danger-btn');
  deleteBtn.onclick = onDeleteTodo;

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = desc;
  const date = document.createElement('h4');
  date.textContent = dueDate;
  date.classList.add('date');

  header.append(completeBtn, todoTitle, editBtn, deleteBtn);
  todo.append(header, description, date);
  return todo;
}

export default todoItem;
