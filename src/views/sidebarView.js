import projectsView from './projectsView';
import defaultNavView from './defaultNavView';
import navFilter from './navFilter';
import eventAggregator from '../eventAggregator';

function sidebarView() {
  let container;
  let sidebar;
  let filterList;

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

  function onFilterClick(e) {
    const item = e.target.closest('[data-filter]');
    const type = item.dataset.filterType;
    const filterValue = item.dataset.filter;
    eventAggregator.publish('filterTodo', { type, filterValue });
    eventAggregator.publish('projectSelected', filterValue);
  }
  function createFilters() {
    const todayFilter = navFilter('Today', 'date', 'today', onFilterClick);
    filterList.append(todayFilter);
    sidebar.appendChild(filterList);
  }

  function selectFilter(id) {
    for (let filter of filterList.children) {
      if (filter.dataset.filter === id) filter.classList.add('selected');
      else filter.classList.remove('selected');
    }
  }

  function render() {
    emptySidebar();
    defaultNavView.initialize(sidebar);
    createFilters();
    projectsView.initialize(sidebar);
  }

  function initialize(sidebarContainer) {
    eventAggregator.subscribe('projectSelected', selectFilter);

    container = sidebarContainer;
    sidebar = createSidebar();
    filterList = document.createElement('ul');
    filterList.classList.add('filter-list');
    container.appendChild(sidebar);
    render();
  }

  return { initialize, render };
}

const sidebar = sidebarView();

export default sidebar;
