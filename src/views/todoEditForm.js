function todoEditForm({ title, id, desc, dueDate }, onEdit, onClose) {
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
  const description = document.createElement('textarea');
  description.classList.add('description');
  description.name = 'desc';
  description.value = desc;

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('meta-data');
  const date = document.createElement('input');
  date.type = 'date';
  date.name = 'date';
  date.value = dueDate;
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
  dataContainer.append(date);
  buttonsContainer.append(editBtn, cancelBtn);
  form.onsubmit = onEdit;
  form.append(textContainer, dataContainer, buttonsContainer);
  // container.append(form);
  return form;
}

export default todoEditForm;
