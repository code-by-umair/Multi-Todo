import { useState } from 'react';
import { Modal } from './components/Modal';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import Button from './components/Button';
import { List, NotebookPen } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoData, setNewTodoData] = useState({
    title: '',
    tasks: [''],
  });


  const handleCreateTodo = (e) => {
    e.preventDefault()

    const newTodo = {
      id: crypto.randomUUID(),
      title: newTodoData.title.trim(),
      tasks: newTodoData.tasks.filter(task => task.trim()),
    };

    setTodos(prev => [...prev, newTodo]);
    setNewTodoData({ title: '', tasks: [''] });
  };

  const handleUpdateTodo = () => {
    e.preventDefault()

    if (!editingTodo) return;

    const temp = [...todos]
    const updatedTodos = temp.map(todo => {
      if (todo.id === editingTodo.id)
        return {
          ...todo,
          title: editingTodo.title.trim(),
          tasks: editingTodo.tasks.filter(task => task.trim()),
        }
      else {
        return todo
      }
    })

    setTodos(updatedTodos)
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-center items-end gap-x-4 mb-5 bg-blue-500  text-gray-50 rounded-lg pt-5 pb-6">
          <h1 className="text-4xl font-bold ">
            Todo App
          </h1>
          <NotebookPen size={40} />
        </div>

        <div className="bg-white  px-6 py-3 rounded-lg shadow-lg border mb-8">
          <form onSubmit={handleCreateTodo}>

            <TodoForm
              formData={newTodoData}
              setFormData={setNewTodoData}
            />
            <div className='w-full flex justify-center mt-5'>
              <Button type='submit' className='px-6 bg-green-500'>
                Create Todo
              </Button>
            </div>
          </form>
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

        >
          <form onSubmit={handleUpdateTodo}>
            <TodoForm
              formData={editingTodo}
              setFormData={setEditingTodo}
            />
            <Button type='submit'>
              Update Todo
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default App;