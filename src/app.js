import sidebar from './views/sidebarView';

const content = document.getElementById('content');

function App(container) {
  sidebar.initialize(container);
}

const app = App(content);

export default app;
