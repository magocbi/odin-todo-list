import eventAggregator from '../eventAggregator';
import Todo from '../models/todo/todo';
import todoModel from '../models/todo/todoModel';

const todoListController = (function () {
  const todoList = [];
  function onSelectTodos({ todoIdList, name }) {
    todoModel.filterList(name, todoIdList);
  }

  function initialize() {
    eventAggregator.subscribe('selectTodos', onSelectTodos);
  }

  return { initialize };
})();

export default todoListController;
