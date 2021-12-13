import projectModel from '../models/project/projectModel';
import eventAggregator from '../eventAggregator';

const projectsController = (function () {
  function onProjectCreation(name) {
    projectModel.createProject(name);
  }

  function onProjectDelete(id) {
    projectModel.deleteProject(id);
  }

  function initialize() {
    eventAggregator.subscribe('createProject', onProjectCreation);
    eventAggregator.subscribe('deleteProject', onProjectDelete);
    projectModel.createDefaultProject();
    eventAggregator.publish(
      'projectSelected',
      projectModel.getDefaultProjectId()
    );
  }
  return { initialize };
})();

export default projectsController;
