import { useState, useCallback, useEffect, useRef } from "react";
const Tbody = (props) => {
  const baseURL = "https://task-tracker-app-72a25-default-rtdb.firebaseio.com";
  const inputTaskData = useRef(null);
  const [edit, setEdit] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const editHandler = (id) => {
    setEdit(id === edit ? null : id);
    setEditedTask(id === edit ? "" : props.loadTask.find((task) => task.id === id).task);
  };
  const handleInputChange = (e) => setEditedTask(e.target.value);
  function deleteHandler() {
    setEdit(null);
  }
  const updateData = useCallback(
    (id) => {
      const updateTaskData = inputTaskData.current.value;
      const taskData = {
        task: updateTaskData,
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
              {edit === id ? <input className="border-cyan-600 border p-2 w-auto focus:outline-none" type="text" name="task" id="task" value={editedTask} onChange={handleInputChange} ref={inputTaskData} /> : task}
            </th>
            <td className="px-6 py-4">{priority}</td>
            <td className="px-6 py-4">{category}</td>
            <td className="px-6 py-4">{status}</td>
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
