import { useState } from 'react';
import { Modal } from './components/Modal';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import type { Todo, TodoFormData } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleCreateTodo = (formData: TodoFormData) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      tasks: formData.tasks.filter(task => task.trim()),
    };
    setTodos(prev => [...prev, newTodo]);
    setIsModalOpen(false);
  };

  const handleUpdateTodo = (formData: TodoFormData) => {
    if (!editingTodo) return;
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === editingTodo.id
          ? {
              ...todo,
              title: formData.title.trim(),
              tasks: formData.tasks.filter(task => task.trim()),
            }
          : todo
      )
    );
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-center text-white mb-8">
            Todo App
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create New Todo
          </button>
        </header>

        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTodo ? 'Edit Todo' : 'Create New Todo'}
        >
          <TodoForm
            mode={editingTodo ? 'edit' : 'create'}
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            initialData={
              editingTodo
                ? { title: editingTodo.title, tasks: editingTodo.tasks }
                : undefined
            }
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;