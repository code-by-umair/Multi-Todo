export default function Select({ formData, handledropdownchange, options }) {
  return (
    <select
      className="border-gray-400 bg-gray-400 border-2 rounded text-white p-2"
      value={formData.priorities.priority}
      onChange={(e) => handledropdownchange(e)}
    >
      {options.map((item) => {
        return <option value={item.value}>{item.name}</option>;
      })}
    </select>
  );
}
