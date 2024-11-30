import './App.css';
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Task Manager</h1>
        <TaskList />
        <AddTask />
      </div>
    </div>
  );
};

export default App;
