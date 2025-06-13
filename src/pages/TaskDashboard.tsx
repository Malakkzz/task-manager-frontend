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

  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <ul className="space-y-4 mb-6">
        {tasks.map((task) => (
          <li key={task.id} className="p-4 border rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
              </div>

              <div className="flex flex-col items-end">
                <label className="text-sm">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleCompleted(task.id, !task.isCompleted)}
                    className="mr-2"
                  />
                  Done
                </label>
                <button
                  className="text-blue-600 text-sm hover:underline mt-2"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/new-task"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Task
      </Link>

      {/* Rendering the Modal
      Only renders the modal if there's a task selected
      Passes handlers to manage modal state and save logic */}
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
