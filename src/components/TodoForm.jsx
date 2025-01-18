import { Plus, Trash2, AlertTriangle as TriangleAlert } from 'lucide-react';
import Input from './Input';
import Button from './Button';

export function TodoForm({
  formData,
  setFormData,
}) {
  const handleTitleChange = (e) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  };

  const handleTaskChange = (value, index) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => (i === index ? value : task)),
    }));
  };

  const addTask = () => {
    setFormData(prev => ({
      ...prev,
      tasks: [...prev.tasks, ''],
    }));
  };

  const removeTask = (index) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="font-medium text-2xl block">Title</label>
        <div className="flex items-center gap-2">
          <Input
            value={formData.title}
            onChange={handleTitleChange}
            placeholder={'Enter todo title'}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-xl block">Tasks</label>
        <div className="space-y-2">
          {formData.tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={task}
                onChange={e => handleTaskChange(e.target.value, index)}
                placeholder="Enter task description"
                required
              />

              <Button onClick={() => removeTask(index)} >
                <Trash2 size={20} />
              </Button>

              {index === formData.tasks.length - 1 && (
                <Button onClick={addTask}>
                  <Plus size={20} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}