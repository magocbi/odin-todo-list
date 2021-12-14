import projectModel from '../models/project/projectModel';
import eventAggregator from '../eventAggregator';

const projectsController = (function () {
  function onProjectCreation(name) {
    projectModel.createProject(name);
  }

  function onProjectDelete(id) {
    projectModel.deleteProject(id);
  }

  function onProjectSelect(id) {
    projectModel.selectProject(id);
  }

  function onProjectListRequired() {
    let projectList = projectModel
      .getProjects()
      .map(({ name, getId }) => ({ name, id: getId() }));
    let selectedId = projectModel.getCurrentProject();
    eventAggregator.publish('todoFormDataSent', { selectedId, projectList });
  }

  function assignTodo({ project, todo }) {
    projectModel.assignTodoToProject(project, todo);
    projectModel.selectProject(project);
  }

  function initialize() {
    eventAggregator.subscribe('createProject', onProjectCreation);
    eventAggregator.subscribe('deleteProject', onProjectDelete);
    eventAggregator.subscribe('projectSelected', onProjectSelect);
    eventAggregator.subscribe('todoFormDataRequired', onProjectListRequired);
    eventAggregator.subscribe('todoCreated', assignTodo);
    projectModel.createDefaultProject();
  }
  return { initialize };
})();

export default projectsController;
