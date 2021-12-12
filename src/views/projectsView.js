import eventAggregator from '../eventAggregator';

const projectsView = (function () {
  let container;
  let projectsNav;

  eventAggregator.subscribe('projectCreated', addProject);

  function emptyProjects() {
    while (projectsNav.firstChild) {
      projectsNav.firstChild.remove();
    }
  }

  function addProject({ name, projectId }) {
    const project = document.createElement('button');
    project.textContent = name;
    project.dataset.id = projectId;
    projectsNav.append(project);
  }

  function onShowProjectForm() {
    eventAggregator.publish('showProjectForm');
  }

  function render() {
    emptyProjects();
    const projectsHeader = document.createElement('div');
    const addBtn = document.createElement('button');
    addBtn.textContent = '+';
    addBtn.onclick = onShowProjectForm;
    const title = document.createElement('h2');
    title.textContent = 'Projects';
    projectsHeader.append(title, addBtn);
    projectsNav.append(projectsHeader);
  }

  function initialize(viewContainer) {
    container = viewContainer;
    projectsNav = document.createElement('nav');
    projectsNav.id = 'projects-nav';
    container.append(projectsNav);
    render();
  }

  return { initialize, render };
})();

export default projectsView;
