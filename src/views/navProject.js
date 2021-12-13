function navProject(id, name, onSelect, onDelete = null) {
  const project = document.createElement('li');
  project.classList.add('project-item');
  project.dataset.id = id;
  const title = document.createElement('h3');
  title.textContent = name;
  if (onDelete) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('danger-btn');
    deleteBtn.textContent = '-';
    deleteBtn.onclick = onDelete;
    project.append(title, deleteBtn);
  } else {
    project.append(title);
  }

  project.onclick = onSelect;

  return project;
}

export default navProject;
