import { Pencil, Trash2 } from 'lucide-react';

export function TodoList({ todos, onEdit, onDelete }) {
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
          className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg border transition-transform hover:scale-[1.02]"
        >
          <h3 className="text-2xl font-semibold mb-4">{todo.title}</h3>
          <ul className="space-y-2 mb-4">
            {todo.tasks.map((task, index) => (
              <li
                key={index}
                className="p-2 bg-white bg-opacity-50 rounded-md border"
              >
                {task}
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onEdit(todo)}
              className="p-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              aria-label="Edit todo"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}