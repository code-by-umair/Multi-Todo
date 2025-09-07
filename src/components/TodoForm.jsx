import { Plus, Trash2, AlertTriangle as TriangleAlert } from "lucide-react";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
export function TodoForm({ formData, setFormData }) {
const options=  [
    {name:"Set Priority Level",value: ""},
    {name:"Highest Priority",value: "1"},
    {name:"Moderate Priority",value: "2"},
    {name:"Least Priority",value: "3"}
    ]
    
  const handledropdownchange = (e) => {
    setFormData((prev) => ({
      ...prev,
      priorities: { priority: e.target.value },
    }));
    console.log("formdata", formData);
  };
  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };
  const handleTaskChange = (value, index) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((obj, i) => {
        if (i === index) {
          return {
            ...obj,
            task: value,
          };
        } else {
          return obj;
        }
      }),
    }));
  };

  const addTask = () => {
    setFormData((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          taskId: crypto.randomUUID(),
          task: "",
          isCompleted: false,
        },
      ],
    }));
  };

  const removeTask = (index) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          {" "}
          <label className="font-medium text-2xl block">Title</label>
          <Select
            formData={formData}
            options={options}
            handledropdownchange={handledropdownchange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            className={"mt-8 border-2 rounded p-2 w-full"}
            value={formData.title}
            onChange={handleTitleChange}
            placeholder={"Enter todo title"}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-xl block">Tasks</label>
        <div className="space-y-2  overflow-y-scroll max-h-[50vh] px-2">
          {formData.tasks.map((obj, index) => (
            <div key={index} className="flex items-center gap-2 ">
              <Input
                value={obj.task}
                onChange={(e) => handleTaskChange(e.target.value, index)}
                placeholder="Enter task description"
                required
              />

              {index === formData.tasks.length - 1 && (
                <Button type="button" onClick={addTask}>
                  <Plus size={20} />
                </Button>
              )}

              {(formData.tasks.length > 1 || index !== 0) && (
                <Button
                  type="button"
                  onClick={() => removeTask(index)}
                  className={"bg-red-500 hover:bg-red-600"}
                >
                  <Trash2 size={20} />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <select className="border-gray-400 bg-gray-400 border-2 rounded text-white" value={formData.priorities.priority} 
onChange={(e)=>handledropdownchange(e)}>
 <option className="bg-gray-500" value="">Set Priority Level</option>
 <option className="bg-gray-500" value="1">Highest Priority</option>
 <option className="bg-gray-500" value="2">Moderate priority</option>
 <option className="bg-gray-500" value="3">Least priority</option>
</select>  */
}
