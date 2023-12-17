import { useRef, useState } from "react";

const Form = (props) => {
    const taskName = useRef();
    function submitHandler(e) {
      e.preventDefault();
      const enteredTask = taskName.current.value;
      const taskData = {
        task: enteredTask,
      };
      fetch("https://task-tracker-app-72a25-default-rtdb.firebaseio.com/tasks.json", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "content-type" : "application/json"
        },
      }).then(() => {
        if (props.onAddTask) {
          props.onAddTask();
        }
      });
    }
    return (
      <form className="mt-15 mx-10" onSubmit={submitHandler}>
        <div className="flex justify-end">
          <input type="text" name="" id="" placeholder="Add a Task" className="border-y-cyan-600 border outline-none border-l-cyan-600 p-3" rquired="true" ref={taskName} />
          <button className="text-white bg-cyan-600 px-6 py-3  hover:bg-cyan-400 transition-all" type="submit">
            Add
          </button>
        </div>
      </form>
    );
  };

export default Form;