function todoItem(
  title,
  priority,
  desc = '',
  dueDate = null,
  completed = false
) {
  const todo = document.createElement('li');
  todo.classList.add('todo-item');

  const header = document.createElement('div');
  header.classList.add('todo-header');
  const completeBtn = document.createElement('button');
  completeBtn.type = 'button';
  completeBtn.classList.add('complete-toggle-btn');
  // &#10003;
  completeBtn.textContent = completed ? '&#x2713;' : '';
  if (completed) completeBtn.classList.add('complete');
  const todoTitle = document.createElement('h3');
  todoTitle.textContent = title;
  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.textContent = 'Edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = '-';

  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = desc;
  const date = document.createElement('input');
  date.type = 'date';

  header.append(completeBtn, todoTitle, editBtn, deleteBtn);
  todo.append(header, description, date);
  return todo;
}
