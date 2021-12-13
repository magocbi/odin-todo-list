import eventAggregator from '../eventAggregator';
import navProject from './navProject';

const projectsView = (function () {
  let container;
  let projectsNav;
  let projectList;

  eventAggregator.subscribe('projectCreated', addProject);
  eventAggregator.subscribe('projectDeleted', deleteProject);

  function emptyProjects() {
    while (projectList.firstChild) {
      projectList.firstChild.remove();
    }
  }

  function onDelete(e) {
    const id = e.target.closest('[data-id]')?.dataset.id;
    eventAggregator.publish('deleteProject', id);
  }

  function addProject({ name, projectId }) {
    const project = navProject(projectId, name, onDelete);
    projectList.append(project);
  }

  function deleteProject(id) {
    [...projectList.children]
      .find((project) => project.dataset.id === id)
      ?.remove();
  }

  function onShowProjectForm() {
    eventAggregator.publish('showProjectForm');
  }

  function render() {
    emptyProjects();
    const projectsHeader = document.createElement('div');
    projectsHeader.classList.add('projects-nav-header');
    const addBtn = document.createElement('button');
    addBtn.classList.add('success-btn');
    addBtn.textContent = '+';
    addBtn.onclick = onShowProjectForm;
    const title = document.createElement('h2');
    title.textContent = 'Projects';
    projectsHeader.append(title, addBtn);
    projectsNav.append(projectsHeader, projectList);
  }

  function initialize(viewContainer) {
    container = viewContainer;
    projectsNav = document.createElement('nav');
    projectsNav.id = 'projects-nav';
    projectsNav.classList.add('projects-nav');
    projectList = document.createElement('ul');
    projectList.classList.add('project-list');
    container.append(projectsNav);
    render();
  }

  return { initialize, render };
})();

export default projectsView;
