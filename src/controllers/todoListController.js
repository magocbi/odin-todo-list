import eventAggregator from '../eventAggregator';
import Todo from '../models/todo/todo';

const todoListController = (function () {
  const todoList = [];
  let currentTodoList = [];

  function onSelectTodos({ todoIdList, name }) {
    currentTodoList = todoIdList.filter((todo) =>
      todoIdList.includes(todo.getId())
    );
    // console.log(name, todoIdList);
    eventAggregator.publish('todosSelected', currentTodoList);
  }

  function initialize() {
    eventAggregator.subscribe('selectTodos', onSelectTodos);
  }

  return { initialize };
})();

export default todoListController;
