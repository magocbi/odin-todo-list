import priorities from '../priorities';

function todoEditForm({ title, id, desc, dueDate, priority }, onEdit, onClose) {
  // const container = document.createElement('div');
  const form = document.createElement('form');
  form.classList.add('edit-todo-form');
  form.dataset.editId = id;
  form.onsubmit = onEdit;

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-data');
  const todoTitle = document.createElement('input');
  todoTitle.classList.add('todo-title');
  todoTitle.type = 'text';
  todoTitle.required = true;
  todoTitle.name = 'title';
  todoTitle.value = title;
  todoTitle.placeholder = 'Task that must be completed';
  const description = document.createElement('textarea');
  description.classList.add('description');
  description.name = 'desc';
  description.value = desc;
  description.placeholder = 'Description...';

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('meta-data');
  const date = document.createElement('input');
  date.type = 'date';
  date.name = 'date';
  date.value = dueDate;

  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('dropdown-priority');
  prioritySelect.name = 'priority';
  for (let [index, color] of priorities.entries()) {
    const option = document.createElement('option');
    option.value = `${index}`;
    option.textContent = `Priority ${index + 1}`;
    if (`${index}` === priority) {
      option.selected = true;
    }
    prioritySelect.appendChild(option);
  }

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('button-container');
  const editBtn = document.createElement('button');
  editBtn.classList.add('success-btn');
  editBtn.type = 'submit';
  editBtn.textContent = 'Edit';
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('danger-btn');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = onClose;

  textContainer.append(todoTitle, description);
  dataContainer.append(date, prioritySelect);
  buttonsContainer.append(editBtn, cancelBtn);
  form.onsubmit = onEdit;
  form.append(textContainer, dataContainer, buttonsContainer);
  // container.append(form);
  return form;
}

export default todoEditForm;
