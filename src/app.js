import projectsController from './controllers/projectsController';
import eventAggregator from './eventAggregator';
import projectForm from './views/projectForm';
import sidebar from './views/sidebarView';
import todoListView from './views/todoListView';

const content = document.getElementById('content');

function App(container) {
  const formProject = projectForm();
  container.append(formProject);

  eventAggregator.subscribe('showProjectForm', onShowProjectForm);

  function onShowProjectForm() {
    formProject.classList.remove('hidden');
  }

  sidebar.initialize(container);
  todoListView.initialize(container);
  projectsController.initialize();
}

const app = App(content);

export default app;
