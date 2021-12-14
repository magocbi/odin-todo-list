import eventAggregator from '../eventAggregator';

function projectForm() {
  const container = document.createElement('div');
  const form = document.createElement('form');
  function closeForm() {
    container.classList.add('hidden');
  }

  function resetForm() {
    form.elements.name.value = '';
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const name = form.elements.name.value;
    resetForm();
    closeForm();
    eventAggregator.publish('createProject', name);
  }

  container.classList.add('overlay', 'project-form-overlay', 'hidden');

  form.onsubmit = onFormSubmit;
  form.classList.add('project-form');
  const formHeader = document.createElement('h2');
  formHeader.textContent = 'Create Project';
  formHeader.classList.add('project-form-header');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Project name';
  nameInput.name = 'name';
  nameInput.required = 'true';
  const addBtn = document.createElement('button');
  addBtn.type = 'submit';
  addBtn.textContent = 'Add';
  addBtn.classList.add('success-btn');
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.onclick = closeForm;
  cancelBtn.textContent = 'Cancel';
  cancelBtn.classList.add('danger-btn');
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('project-form-buttons');
  buttonContainer.append(cancelBtn, addBtn);
  form.append(formHeader, nameInput, buttonContainer);
  container.appendChild(form);
  return container;
}

export default projectForm;
