import eventAggregator from '../eventAggregator';
import navProject from './navProject';

const defaultNavView = (function () {
  let container;
  let defaultNav;
  let defaultList;

  function onSelect(e) {
    e.stopPropagation();
    if (e.target.nodeName === 'BUTTON') return;
    const item = e.target.closest('[data-id]');
    const id = item.dataset.id;
    eventAggregator.publish('selectProject', id);
  }

  function addDefault({ defaultProjectId, name }) {
    const defaultProject = navProject(defaultProjectId, name, onSelect);
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

  function selectDefault(id) {
    highlightSelected(id);
  }

  function highlightSelected(id) {
    for (let item of defaultList.children) {
      if (item.dataset.id === id) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    }
  }

  function initialize(viewContainer) {
    eventAggregator.subscribe('defaultAdded', addDefault);
    eventAggregator.subscribe('projectSelected', selectDefault);
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
