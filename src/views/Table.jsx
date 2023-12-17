import Form from "../component/Form";
import Tbody from "../component/Tbody";
import { useState, useEffect, useCallback } from "react";
const Table = () => {
  const thStyle = "px-6 py-3";
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const heading = ["Task Name", "Priority", "Category", "Status"];
  const fetchData = useCallback(() => {
    setLoading(true);
    fetch("https://task-tracker-app-72a25-default-rtdb.firebaseio.com/tasks.json")
      .then((response) => response.json())
      .then((data) => {
        const mytasks = [];
        for (const key in data) {
          const mytask = {
            id: key,
            ...data[key],
          };
          mytasks.push(mytask);
        }
        setLoading(false);
        setTasks(mytasks);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddTask = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="w-5/6 mt-16 mx-10">
        <Form onAddTask={handleAddTask} />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 mx-10">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {heading.map((items, index) => (
                  <th key={index} scope="col" className={thStyle}>
                    {items}
                  </th>
                ))}
                <th scope="col" className={thStyle}>
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <Tbody loadTask={tasks} />
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-5/6 mt-16 mx-10">
      <Form onAddTask={handleAddTask} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 mx-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {heading.map((items, index) => (
                <th key={index} scope="col" className={thStyle}>
                  {items}
                </th>
              ))}
              <th scope="col" className={thStyle}>
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <Tbody loadTask={tasks} key={tasks.id} />
        </table>
      </div>
    </div>
  );
};

export default Table;
