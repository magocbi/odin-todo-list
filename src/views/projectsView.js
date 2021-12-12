const projectsView = (function () {
  let container;
  let projectsNav;

  function emptyProjects() {
    while (projectsNav.firstChild) {
      projectsNav.firstChild.remove();
    }
  }

  function render() {
    emptyProjects();
    const title = document.createElement('h2');
    title.textContent = 'Projects';
    projectsNav.append(title);
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
