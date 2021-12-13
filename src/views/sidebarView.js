import projectsView from './projectsView';
import defaultNavView from './defaultNavView';

function sidebarView() {
  let container;
  let sidebar;

  function emptySidebar() {
    while (sidebar.firstChild) {
      sidebar.firstChild.remove();
    }
  }

  function createSidebar() {
    const sidebar = document.createElement('nav');
    sidebar.id = 'sidebar';
    sidebar.classList.add('sidebar');
    return sidebar;
  }

  function render() {
    emptySidebar();
    defaultNavView.initialize(sidebar);
    projectsView.initialize(sidebar);
  }

  function initialize(sidebarContainer) {
    container = sidebarContainer;
    sidebar = createSidebar();
    container.appendChild(sidebar);
    render();
  }

  return { initialize, render };
}

const sidebar = sidebarView();

export default sidebar;
