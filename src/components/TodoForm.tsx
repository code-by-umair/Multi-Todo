import { useState } from 'react';
import { Plus, Trash2, AlertTriangle as TriangleAlert } from 'lucide-react';
import type { TodoFormData, TodoFormProps } from '../types/todo';

const EMPTY_TASK = '';

export function TodoForm({ onSubmit, initialData, mode }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoFormData>(() => ({
    title: initialData?.title ?? '',
    tasks: initialData?.tasks ?? [EMPTY_TASK],
  }));
  const [showTitleError, setShowTitleError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
    setShowTitleError(false);
  };

  const handleTaskChange = (value: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === index ? value : task)),
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, EMPTY_TASK],
    }));
  };

  const removeTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setShowTitleError(true);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="font-medium text-2xl block">Title</label>
        <div className="flex items-center gap-2">
          <input
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
            className="flex-1 p-2 border rounded-md focus:outline-blue-400 focus:ring-blue-400"
          />
          {showTitleError && (
            <TriangleAlert className="text-yellow-500" size={24} />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-xl block">Tasks</label>
        <div className="space-y-2">
          {formData.tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={task}
                onChange={e => handleTaskChange(e.target.value, index)}
                placeholder="Enter task description"
                className="flex-1 p-2 border rounded-md focus:outline-blue-400 focus:ring-blue-400"
              />
              <button
                onClick={() => removeTask(index)}
                className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Remove task"
              >
                <Trash2 size={20} />
              </button>
              {index === formData.tasks.length - 1 && (
                <button
                  onClick={addTask}
                  className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Add task"
                >
                  <Plus size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {mode === 'create' ? 'Add Todo' : 'Update Todo'}
      </button>
    </div>
  );
}