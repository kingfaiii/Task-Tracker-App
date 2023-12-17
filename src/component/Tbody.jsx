const Tbody = (props) => {
  return (
    <tbody>
      {props.loadTask.map((mytasks) => {
        const { id, task, priority, category, status } = mytasks;

        return (
          <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {task}
            </th>
            <td className="px-6 py-4">{priority}</td>
            <td className="px-6 py-4">{category}</td>
            <td className="px-6 py-4">{status}</td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-3">
                <a href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
                <a href="/" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                  Delete
                </a>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
