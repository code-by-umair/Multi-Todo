import { useState } from 'react';
import { Modal } from './components/Modal';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoData, setNewTodoData] = useState({
    title: '',
    tasks: [''],
  });
  const [showTitleError, setShowTitleError] = useState(false);

  const handleCreateTodo = () => {
    if (!newTodoData.title.trim()) {
      setShowTitleError(true);
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      title: newTodoData.title.trim(),
      tasks: newTodoData.tasks.filter(task => task.trim()),
    };
    
    setTodos(prev => [...prev, newTodo]);
    setNewTodoData({ title: '', tasks: [''] });
    setShowTitleError(false);
  };

  const handleUpdateTodo = (formData) => {
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

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = (id) => {
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
        </header>

        <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg border mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Create New Todo</h2>
          <TodoForm
            mode="create"
            formData={newTodoData}
            setFormData={setNewTodoData}
            showTitleError={showTitleError}
            setShowTitleError={setShowTitleError}
          />
          <button
            onClick={handleCreateTodo}
            className="w-full mt-4 p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Todo
          </button>
        </div>

        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Edit Todo"
          primaryAction={{
            label: 'Update Todo',
            onClick: () => handleUpdateTodo(editingTodo),
          }}
          secondaryAction={{
            label: 'Cancel',
            onClick: handleCloseModal,
          }}
        >
          <TodoForm
            mode="edit"
            formData={editingTodo}
            setFormData={setEditingTodo}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App;