import projectModel from '../models/project/projectModel';
import eventAggregator from '../eventAggregator';

const projectsController = (function () {
  function onProjectCreation(name) {
    const id = projectModel.createProject(name);
    projectModel.selectProject(id);
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

  function deleteTodoFromProject(id) {
    projectModel.removeTodoFromProject(id);
  }

  function initialize() {
    eventAggregator.subscribe('createProject', onProjectCreation);
    eventAggregator.subscribe('deleteProject', onProjectDelete);
    eventAggregator.subscribe('selectProject', onProjectSelect);
    eventAggregator.subscribe('todoFormDataRequired', onProjectListRequired);
    eventAggregator.subscribe('todoCreated', assignTodo);
    projectModel.initialize();
    eventAggregator.subscribe('todoDeleted', deleteTodoFromProject);
  }
  return { initialize };
})();

export default projectsController;
