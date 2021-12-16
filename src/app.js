import eventAggregator from './eventAggregator';
import projectsController from './controllers/projectsController';
import projectForm from './views/projectForm';
import sidebar from './views/sidebarView';
import todoListView from './views/todoListView';
import todoListController from './controllers/todoListController';

const content = document.getElementById('content');

function App(container) {
  const formProject = projectForm();
  container.append(formProject);

  eventAggregator.subscribe('showProjectForm', onShowProjectForm);

  function onShowProjectForm() {
    formProject.classList.remove('hidden');
    formProject.querySelector('form')?.elements.name.focus();
  }

  sidebar.initialize(container);
  todoListView.initialize(container);
  todoListController.initialize();
  projectsController.initialize();
}

const app = App(content);

export default app;
