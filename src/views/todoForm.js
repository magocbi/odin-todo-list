import eventAggregator from '../eventAggregator';
import priorities from '../priorities';

function todoForm(projectList, selectedId, closeForm) {
  const container = document.createElement('div');
  const form = document.createElement('form');
  form.classList.add('add-todo-form');

  function onSubmit(e) {
    e.preventDefault();
    const { title, desc, date, project, priority } = form.elements;
    const data = {
      title: title.value,
      desc: desc.value,
      date: date.value,
      project: project.value,
      priority: priority.value,
    };
    eventAggregator.publish('createTodo', data);
    closeForm();
  }

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-data');
  const title = document.createElement('input');
  title.classList.add('todo-title');
  title.type = 'text';
  title.required = true;
  title.name = 'title';
  title.placeholder = 'Task that must be completed';
  const description = document.createElement('textarea');
  description.classList.add('description');
  description.name = 'desc';
  description.placeholder = 'Description...';

  const dataContainer = document.createElement('div');
  dataContainer.classList.add('meta-data');
  const date = document.createElement('input');
  date.classList.add('date');
  date.type = 'date';
  date.name = 'date';
  const projectSelect = document.createElement('select');
  projectSelect.classList.add('dropdown-project');
  projectSelect.name = 'project';
  for (let project of projectList) {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    if (project.id === selectedId) {
      option.selected = true;
    }
    projectSelect.appendChild(option);
  }

  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('dropdown-priority');
  prioritySelect.name = 'priority';
  for (let [index, priority] of priorities.entries()) {
    const option = document.createElement('option');
    option.value = `${index}`;
    option.textContent = `Priority ${index + 1}`;
    if (index + 1 === priorities.length) {
      option.selected = true;
    }
    prioritySelect.appendChild(option);
  }

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('button-container');
  const addBtn = document.createElement('button');
  addBtn.classList.add('success-btn');
  addBtn.type = 'submit';
  addBtn.textContent = 'Add';
  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('danger-btn');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = closeForm;

  textContainer.append(title, description);
  dataContainer.append(date, projectSelect, prioritySelect);
  buttonsContainer.append(addBtn, cancelBtn);
  form.onsubmit = onSubmit;
  form.append(textContainer, dataContainer, buttonsContainer);
  container.append(form);
  return container;
}

export default todoForm;
