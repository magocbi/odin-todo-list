import eventAggregator from '../eventAggregator';
import navProject from './navProject';

const defaultNavView = (function () {
  let container;
  let defaultNav;
  let defaultList;

  eventAggregator.subscribe('defaultAdded', addDefault);

  function onSelect(e) {
    e.stopPropagation();
    const id = e.target.closest('[data-id]').dataset.id;
    eventAggregator.publish('projectSelected', id);
  }

  function addDefault({ projectId, name }) {
    const defaultProject = navProject(projectId, name, onSelect);
    defaultList.append(defaultProject);
  }

  function emptyDefaultList() {
    while (defaultList.firstChild) {
      defaultList.firstChild.remove();
    }
  }

  function render() {
    emptyDefaultList();
  }

  function initialize(viewContainer) {
    container = viewContainer;
    defaultNav = document.createElement('nav');
    defaultNav.id = 'default-nav';
    defaultNav.classList.add('default-nav');
    defaultList = document.createElement('ul');
    defaultList.classList.add('default-list');
    defaultNav.append(defaultList);
    container.append(defaultNav);
    render();
  }

  return { initialize };
})();

export default defaultNavView;