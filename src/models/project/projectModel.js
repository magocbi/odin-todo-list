import Project from './project';

const projectModel = (function () {
  let projectId = 0;
  const defaultProjectId = 0;
  const projectList = [];

  function createProject(name) {
    projectId += 1;
    const project = Project(projectId, name);
    projectList.push(project);
  }

  function deleteProject(id) {
    const index = projectList.findIndex((project) => project.getId() === id);
    projectList.splice(index, 1);
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

  return { createProject, deleteProject, getProject, assignTodoToProject };
})();

export default projectModel;
