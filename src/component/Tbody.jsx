import { useState, useCallback, useEffect, useRef } from "react";
const Tbody = (props) => {
  const baseURL = "https://task-tracker-app-72a25-default-rtdb.firebaseio.com";
  const inputTaskData = useRef(null);
  const inputPrioData = useRef(null);

  const inputCateData = useRef(null);
  const inputStatusData = useRef(null);

  const [edit, setEdit] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const editHandler = (id) => {
    setEdit(id === edit ? null : id);
    setEditedTask(id === edit ? "" : props.loadTask.find((task) => task.id === id));
  };
  const handleInputChange = (e) => setEditedTask(e.target.value);
  function deleteHandler() {
    setEdit(null);
  }
  const updateData = useCallback(
    (id) => {
      const updateTaskData = inputTaskData.current.value;
      const updatePrioData = inputPrioData.current.value;
      const updateCateData = inputCateData.current.value;
      const updateStatusData = inputStatusData.current.value;
      const taskData = {
        task: updateTaskData,
        priority: updatePrioData,
        category: updateCateData,
        status: updateStatusData,
      };
      fetch(`${baseURL}/tasks/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      }).then(() => {
        setEdit(null);
        if (props.onUpdateTask) {
          props.onUpdateTask();
        }
      });
    },
    [props]
  );

  const deleteData = (id) => {
    fetch(`${baseURL}/tasks/${id}.json`, {
      method: "DELETE",
    }).then(() => {
      setEdit(null);
      if (props.onUpdateTask) {
        props.onUpdateTask();
      }
    });
  };

  return (
    <tbody>
      {props.loadTask.map((mytasks) => {
        const { id, task, priority, category, status } = mytasks;
        return (
          <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {edit === id ? <input className="border-cyan-600 border p-2 w-auto focus:outline-none" type="text" name="task" id="task" value={editedTask.task} onChange={handleInputChange} ref={inputTaskData} /> : task}
            </th>
            <td className="px-6 py-4">
              {edit === id ? (
                <select name="taskPriority" className="border-cyan-600 border p-2 w-auto focus:outline-none" id="taskPriority" value={editedTask.priority} onChange={handleInputChange} ref={inputPrioData}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                <span className="">{priority}</span>
              )}
            </td>
            <td className="px-6 py-4"> {edit === id ? <input className="border-cyan-600 border p-2 w-auto focus:outline-none" type="text" name="task" id="task" value={editedTask.category} onChange={handleInputChange} ref={inputCateData} /> : category}</td>
            <td className="px-6 py-4">
              {edit === id ? (
                <select name="taskStatus" className="border-cyan-600 border p-2 w-auto focus:outline-none" id="taskStatus" value={editedTask.status} onChange={handleInputChange} ref={inputStatusData}>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Started">Not Started</option>
                </select>
              ) : (
                <span className="">{status}</span>
              )}
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-3">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => (edit === id ? updateData(id) : editHandler(id))}>
                  {edit === id ? "Update" : "Edit"}
                </button>
                <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => (edit === id ? deleteHandler() : deleteData(id))}>
                  {edit === id ? "Cancel" : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
