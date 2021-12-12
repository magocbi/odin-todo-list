import projectsView from './projectsView';

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

    return sidebar;
  }

  function render() {
    emptySidebar();
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
