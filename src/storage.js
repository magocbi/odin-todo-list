const TODO_LIST = 'todoList';
const PROJECT_LIST = 'projectList';
const TODO_ID = 'todoID';
const PROJECT_ID = 'projectID';

function saveTodoList(todoList) {
  const toBeStored = JSON.stringify(todoList);
  localStorage.setItem(TODO_LIST, toBeStored);
}

function saveProjectList(projectList) {
  const toBeStored = JSON.stringify(projectList);
  localStorage.setItem(PROJECT_LIST, toBeStored);
}

function saveProjectID(projectID) {
  const toBeStored = JSON.stringify(projectID);
  localStorage.setItem(PROJECT_ID, toBeStored);
}

function saveTodoID(todoID) {
  const toBeStored = JSON.stringify(todoID);
  localStorage.setItem(TODO_ID, toBeStored);
}

function getTodoList() {
  return JSON.parse(localStorage.getItem(TODO_LIST));
}

function getProjectList() {
  return JSON.parse(localStorage.getItem(PROJECT_LIST));
}

function getProjectID() {
  return JSON.parse(localStorage.getItem(PROJECT_ID));
}

function getTodoID() {
  return JSON.parse(localStorage.getItem(TODO_ID));
}

export {
  saveTodoID,
  saveProjectID,
  saveTodoList,
  saveProjectList,
  getProjectID,
  getTodoID,
  getTodoList,
  getProjectList,
};
