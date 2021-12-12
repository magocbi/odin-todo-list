import projectModel from '../models/project/projectModel';
import eventAggregator from '../eventAggregator';

const projectsController = (function () {
  function onProjectCreation(name) {
    projectModel.createProject(name);
  }

  function onProjectSelect(e) {
    const id = e.target.dataset?.id;
    if (id) {
      projectModel.selectProject();
    }
  }

  function initialize() {
    eventAggregator.subscribe('createProject', onProjectCreation);
  }
  return { initialize };
})();

export default projectsController;
