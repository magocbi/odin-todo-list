function todoForm(projectList) {
  const container = document.createElement('div');
  const form = document.createElement('form');

  const textContainer = document.createElement('div');
  const title = document.createElement('input');
  title.type = 'text';
  title.required = true;
  title.name = 'title';
  const description = document.createElement('textarea');
  description.name = 'desc';

  const dataContainer = document.createElement('div');
  const date = document.createElement('input');
  date.type = 'date';
  date.name = 'date';
  const projectSelect = document.createElement('select');
  for (let project of projectList) {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  }

  const buttonsContainer = document.createElement('div');
  const addBtn = document.createElement('button');
  addBtn.type = 'submit';
  addBtn.textContent = 'Add';
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';

  textContainer.append(title, description);
  dataContainer.append(date, projectSelect);
  buttonsContainer.append(addBtn, cancelBtn);

  form.append(textContainer, dataContainer, buttonsContainer);
  container.append(form);
  return container;
}

export default todoForm;
