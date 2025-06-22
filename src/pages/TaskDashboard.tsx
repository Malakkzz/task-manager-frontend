import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import EditTaskModal from "../components/EditTaskModal";

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]); // stores all fetched tasks
  const [loading, setLoading] = useState(true); // true until tasks are loaded
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); //selectedTask: the task to edit
  const [isModalOpen, setIsModalOpen] = useState(false); // controls whether the modal is shown.

  //Fetches task list from backend API (GET /tasks).
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //Called once on component mount
    fetchTasks();
  }, []);

  //Edit Button Click Handler
  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  //Saving Edited Task
  const handleSave = async (updatedTask: {
    title: string;
    description: string;
  }) => {
    if (!selectedTask) return;
    try {
      //Sends the updated title and description to the backend via PATCH
      await axios.patch(`/tasks/${selectedTask.id}`, updatedTask);
      setIsModalOpen(false);
      fetchTasks(); // Refresh the list after update
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  const toggleCompleted = async (taskId: number, newStatus: boolean) => {
    try {
      await axios.patch(`/tasks/${taskId}`, { isCompleted: newStatus });
      fetchTasks(); // refresh list
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Failed to update completion status"
      );
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/tasks/${taskId}`);
      fetchTasks(); // Refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) return <p className="text-center mt-12 text-gray-600">Loading tasks...</p>;

   return (
    <div className="max-w-4xl mx-auto p-6 mt-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        📝 Your Tasks
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found. Add one!</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-start hover:shadow-lg transition"
            >
              <div className="flex-1">
                <h3
                  className={`text-xl font-semibold ${
                    task.isCompleted ? "line-through text-gray-400" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <p className="mt-2 text-gray-600">{task.description}</p>
              </div>

              <div className="flex flex-col items-end space-y-2 ml-6">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleCompleted(task.id, !task.isCompleted)}
                    className="mr-2 h-4 w-4 accent-green-600"
                  />
                  Done
                </label>
                <button
                  onClick={() => handleEditClick(task)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center mt-10">
        <Link
          to="/new-task"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
        >
          + Add Task
        </Link>
      </div>

      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}