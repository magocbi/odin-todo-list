import Project from './project';
import eventAggregator from '../../eventAggregator';

const projectModel = (function () {
  let projectId = 0;
  const defaultProjectId = 0;
  const projectList = [];
  let currentProject = defaultProjectId;

  function createProject(name) {
    projectId += 1;
    const project = Project(`${projectId}`, name);
    projectList.push(project);
    eventAggregator.publish('projectCreated', { name, projectId });
  }

  function deleteProject(id) {
    const index = projectList.findIndex((project) => project.getId() === id);
    projectList.splice(index, 1);
    eventAggregator.publish('projectDeleted', id);
  }

  function getProject(id) {
    return projectList.find((project) => project.getId() === id);
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
    currentProject = id;
    let project = getProject(id);
    let todoIdList = project.getTodoIdList();
    eventAggregator.publish('selectTodos', { todoIdList, name: project.name });
  }

  function createDefaultProject() {
    const name = 'Inbox';
    const project = Project(defaultProjectId, name);
    projectList.push(project);
    eventAggregator.publish('defaultAdded', { defaultProjectId, name });
    console.log(defaultProjectId);
    selectProject(defaultProjectId);
  }

  return {
    createProject,
    deleteProject,
    getProject,
    assignTodoToProject,
    selectProject,
    createDefaultProject,
    getDefaultProjectId,
  };
})();

export default projectModel;
