import './App.css'
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const App = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <h2>Task List</h2>
      <TaskList />
      <AddTask />

    </div>
  );
};

export default App;