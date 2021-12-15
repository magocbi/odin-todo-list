import Project from './project';
import eventAggregator from '../../eventAggregator';
import {
  getProjectID,
  getProjectList,
  saveProjectID,
  saveProjectList,
} from '../../storage';

const projectModel = (function () {
  let projectId = 0;
  const defaultProjectId = '0';
  let projectList = [];
  let currentProject = defaultProjectId;

  function getStoredProjects() {
    const result = getProjectList();
    if (result) {
      for (let { id, todoIdList, name } of result) {
        let project = Project(id, name, todoIdList);

        projectList.push(project);
        if (id === defaultProjectId) {
          eventAggregator.publish('defaultAdded', { defaultProjectId, name });
        } else {
          eventAggregator.publish('projectCreated', {
            name,
            projectId: `${id}`,
          });
        }
      }
    }
  }

  function getStoredId() {
    const id = getProjectID();
    if (id) projectId = parseInt(id);
  }

  function storeProjectList() {
    saveProjectList(
      projectList.map((p) => ({
        id: p.getId(),
        todoIdList: p.getTodoIdList(),
        ...p,
      }))
    );
  }

  function createProject(name) {
    projectId += 1;
    const project = Project(`${projectId}`, name);
    projectList.push(project);
    eventAggregator.publish('projectCreated', {
      name,
      projectId: `${projectId}`,
    });
    storeProjectList();
    saveProjectID(projectId);
    return project.getId();
  }

  function deleteProject(id) {
    const index = projectList.findIndex((project) => project.getId() === id);
    const project = projectList.splice(index, 1)[0];
    eventAggregator.publish('projectDeleted', {
      id,
      todoIdList: project.getTodoIdList(),
    });
    if (id === currentProject) {
      selectProject(defaultProjectId);
    }
    storeProjectList();
  }

  function getProject(id) {
    return projectList.find((project) => project.getId() === id);
  }
  function assignTodoToProject(projectId, todoId) {
    const project = getProject(projectId);
    project.addTodo(todoId);
    storeProjectList();
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
    eventAggregator.publish('projectSelected', id);
  }

  function createDefaultProject(name = 'Inbox', todoIdList = []) {
    const project = Project(defaultProjectId, name, todoIdList);
    projectList.push(project);
    eventAggregator.publish('defaultAdded', { defaultProjectId, name });
    storeProjectList();
  }

  function getCurrentProject() {
    return currentProject;
  }

  function initialize() {
    getStoredProjects();
    getStoredId();
    if (!getProject(defaultProjectId)) createDefaultProject();
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
    getProjects,
    getCurrentProject,
    initialize,
  };
})();

export default projectModel;
