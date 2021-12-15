import eventAggregator from '../eventAggregator';
import navProject from './navProject';

const projectsView = (function () {
  let container;
  let projectsNav;
  let projectList;

  function emptyProjects() {
    while (projectList.firstChild) {
      projectList.firstChild.remove();
    }
  }
  function onSelect(e) {
    e.stopPropagation();
    if (e.target.nodeName === 'BUTTON') return;
    const project = e.target.closest('[data-id]');
    const id = project.dataset.id;
    eventAggregator.publish('selectProject', id);
  }

  function onDelete(e) {
    const id = e.target.closest('[data-id]')?.dataset.id;
    eventAggregator.publish('deleteProject', id);
  }

  function addProject({ name, projectId }) {
    const project = navProject(projectId, name, onSelect, onDelete);
    projectList.append(project);
    eventAggregator.publish('selectProject', projectId);
  }

  function deleteProject(id) {
    [...projectList.children]
      .find((project) => project.dataset.id === id)
      ?.remove();
  }

  function onShowProjectForm() {
    eventAggregator.publish('showProjectForm');
  }

  function selectProject(id) {
    highlightSelected(id);
  }

  function highlightSelected(id) {
    for (let project of projectList.children) {
      if (project.dataset.id === id) {
        project.classList.add('selected');
      } else {
        project.classList.remove('selected');
      }
    }
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
    eventAggregator.subscribe('projectCreated', addProject);
    eventAggregator.subscribe('projectDeleted', deleteProject);
    eventAggregator.subscribe('projectSelected', selectProject);
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
