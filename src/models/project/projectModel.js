import Project from './project';
import eventAggregator from '../../eventAggregator';

const projectModel = (function () {
  let projectId = 0;
  const defaultProjectId = 0;
  const projectList = [];
  let currentProject = defaultProjectId;

  function createProject(name) {
    projectId += 1;
    const project = Project(projectId, name);
    projectList.push(project);
    eventAggregator.publish('projectCreated', { name, projectId });
  }

  function deleteProject(id) {
    const index = projectList.findIndex((project) => project.getId() === id);
    projectList.splice(index, 1);
    eventAggregator.publish('projectDeleted', id);
  }

  function getProject(id) {
    return projectList.find((project) => project.id === id);
  }
  function assignTodoToProject(projectId, todoId) {
    const project = getProject(projectId);
    project.addTodo(todoId);
  }

  function getProjects() {
    return projectList;
  }

  function getDefaultProjectId() {
    return defaultProjectId;
  }

  function selectProject(id) {
    let currentProject = id;
  }

  return {
    createProject,
    deleteProject,
    getProject,
    assignTodoToProject,
    selectProject,
  };
})();

export default projectModel;
