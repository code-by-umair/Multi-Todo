import { ListTodo, Pencil, Trash2 } from "lucide-react";
import { Badge } from "./Badge";
import { formatDate } from "../utils/DateTime";
export function TodoList({
  todos,
  onEdit,
  onDelete,
  onCheckListChange,
  filterBy,
  onFilterChange,
}) {
  // let taskIsCompleted;
  // if(filterBy ==='pending'){
  //   taskIsCompleted = false
  // }else if (filterBy ==='completed'){
  //   taskIsCompleted = true
  // }

  //alternative of if-else condition
  const taskIsCompleted = {
    pending: false,
    completed: true,
  };

  const checkstyle = (todoId, taskIdx) => {
    const tempTodo = todos.find((todo) => todo.id === todoId);
    if (tempTodo.tasks[taskIdx].isCompleted == true) {
      return true;
    } else {
      false;
    }
  };

  const getCheckedItem = (id) => {
    //match with id -> single todo object from todos
    // get tasks array from single todo object.
    //  and apply filter on task array, and get the length of the new array

    const todo = todos.find((item) => {
      return item.id == id;
    });
    const completedtask = todo.tasks.filter((task) => {
      return task.isCompleted == true;
    });

    return completedtask.length;
  };

  if (todos.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No todos yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white  py-6 px-10 rounded-lg shadow-lg border transition-transform hover:scale-[1.02]`}
        >
          <div className="flex gap-x-8">
            <div className="w-full">
            
  {parseInt(todo.priorities.priority) === 1 ? <button className="text-xs font-medium pt-[2px] rounded-full px-3 h-6 text-gray-800 min-w-fit border bg-green-400">Highest Priority</button> : 
   parseInt(todo.priorities.priority) === 2 ? <button className="text-xs font-medium pt-[2px] rounded-full px-3 h-6 text-gray-800 min-w-fit border bg-blue-400">Moderate Priority</button> : 
   <button className="text-xs font-medium pt-[2px] bg-orange-400 rounded-full px-3 h-6 text-gray-800 min-w-fit border ">Least Priority</button>}

              <h3 className="text-2xl font-semibold mb-5 text-center text-gray-600">
                {todo.title}
              </h3>

              <div className="flex gap-x-2">
                <ListTodo size={15} />
                <p className="text-xs font-medium text-gray-500 ">
                  {" "}
                  check list
                </p>
              </div>
              <ul className="space-y-2 mb-4">
                {todo.tasks
                  .filter((task) =>
                    filterBy === "none"
                      ? true
                      : task.isCompleted === taskIsCompleted[filterBy]
                  )
                  .map((obj) => (
                    <div className="flex ">
                      <input
                        type="checkbox"
                        checked={obj.isCompleted}
                        onChange={(e) => onCheckListChange(todo.id, obj.taskId)}
                        key={`inp-${obj.taskId}`}
                        className="me-2"
                      />
                      <li
                        key={obj.taskId}
                        className={`p-2 ${
                          obj.isCompleted ? "line-through" : ""
                        } bg-white w-full border-b`}
                      >
                        {obj.task}
                      </li>
                    </div>
                  ))}
              </ul>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(todo)}
                  className="p-2 text-white bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors"
                  aria-label="Edit todo"
                >
                  <Pencil color="orange" size={15} />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-white bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                  aria-label="Delete todo"
                >
                  <Trash2 color="red" size={15} />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between pl-6  w-60 border-l border-gray-100">
              <div className="flex flex-col gap-y-3">
                <Badge
                  text={`Total Task • ${todo.tasks.length}`}
                  color={"bg-blue-300"}
                  onClick={() => onFilterChange("none")}
                />
                <Badge
                  text={`Completed Task • ${getCheckedItem(todo.id)}`}
                  color={"bg-green-300"}
                  onClick={() => onFilterChange("completed")}
                />
                <Badge
                  text={`Pending Task • ${
                    todo.tasks.length - getCheckedItem(todo.id)
                  }`}
                  color={"bg-orange-300"}
                  onClick={() => onFilterChange("pending")}
                />
              </div>
              <div className="text-xs mt-4 font-semibold text-gray-500">
                {formatDate(todo.updatedAt) ?<>
                <p>updated at:</p>
                <p>{formatDate(todo.updatedAt)} </p></>: false}
                <p className="mt-1">created at:</p>
                <p>{formatDate(todo.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
