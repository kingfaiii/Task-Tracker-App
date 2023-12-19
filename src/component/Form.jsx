import { useRef, useState } from "react";
import Modal from "./Modal";
const Form = (props) => {
  const taskName = useRef();
  const taskpriority = useRef();
  const taskcategory = useRef();
  const taskStatus = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const enteredTask = taskName.current.value;
    const enteredPrio = taskpriority.current.value;
    const enteredCate = taskcategory.current.value;
    const enteredStatus = taskStatus.current.value;

    const taskData = {
      task: enteredTask,
      priority: enteredPrio,
      category: enteredCate,
      status: enteredStatus,
    };
    fetch("https://task-tracker-app-72a25-default-rtdb.firebaseio.com/tasks.json", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      if (props.onAddTask) {
        props.onAddTask();
      }
    });
  }
  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <p className="mb-6 text-lg font-bold text-center">Add Task Tracker</p>
        <input type="text" name="taskName" className="w-full focus:outline-none border-b-cyan-400 border-b my-5" id="taskName" placeholder="Task Name" ref={taskName} />
        <select name="taskPriority" className="w-full focus:outline-none border-b-cyan-400 border-b my-5" id="taskPriority" ref={taskpriority}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input type="text" name="taskCategory" className="w-full focus:outline-none border-b-cyan-400 border-b my-5" id="taskCategory" placeholder="Category" ref={taskcategory} />
        <select name="taskStatus" className="w-full focus:outline-none border-b-cyan-400 border-b my-5" id="taskStatus" ref={taskStatus}>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
        </select>
        <button type="submit" className="bg-cyan-600 text-white py-2 px-6 mt-5">
          Add Task
        </button>
      </form>
    </Modal>
  );
};

export default Form;
