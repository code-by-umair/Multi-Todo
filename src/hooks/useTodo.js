import { useState } from "react";

export const useTodos = (initalNewtodoData) => {
  const [todos, setTodos] = useState([]);
  const [newTodoData, setNewTodoData] = useState(initalNewtodoData);

  // handle create todo
  const createTodo = (e) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: newTodoData.title.trim(),
      tasks: newTodoData.tasks.filter((obj) => obj.task.trim()),
      createdAt:Date.now(),
      updatedAt:false,
      priorities:{priority:newTodoData.priorities.priority}
    };
    console.log("newtododta",newTodoData)
    setTodos((prev) => [...prev, newTodo].sort((a, b) => 
      parseInt(a.priorities.priority) - parseInt(b.priorities.priority)
    ));
    setNewTodoData(initalNewtodoData)

  };

  // handle update todo
  const updateTodo = (editingTodo) => {
    const temp = [...todos];
    const updatedTodos = temp.map((todo) => {
      if (todo.id === editingTodo.id)
        return {
          ...todo,
          title: editingTodo.title.trim(),
          tasks: editingTodo.tasks.filter((obj) => obj.task.trim()),
          updatedAt:Date.now(),
      priorities:{priority:editingTodo.priorities.priority},
      
        };
      else {
        return todo;
      }
    });
    const newdata = updatedTodos.sort(
      (a, b) => parseInt(a.priorities.priority) - parseInt(b.priorities.priority)
    );
console.log("newdata")
  
    setTodos(newdata);
    // console.log("updated data", updatedTodos);
  };

  // delete delete by id
  const deleteTodoById = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  //handle check box by todo id and task id
  const updateCheckBox = (todoId, taskId) => {
    const tempTodo = todos.find((todo) => todo.id === todoId);

    const updatedTasks = tempTodo.tasks.map((obj) => {
      if (obj.taskId === taskId) {
        return {
          ...obj,
          isCompleted: !obj.isCompleted,
        };
      } else {
        return obj;
      }
    });
  const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          tasks: updatedTasks,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  };

  return {
    createTodo,
    updateTodo,
    deleteTodoById,
    todos,
    newTodoData,
    setTodos,
    updateCheckBox,
    setNewTodoData,
  };
};
    