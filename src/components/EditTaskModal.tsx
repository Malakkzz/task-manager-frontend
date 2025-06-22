import { useEffect, useState } from "react";

interface EditTaskModalProps {
  task: { id: number; title: string; description: string };//the task being edited
  isOpen: boolean;//controls visibility (whether the modal shows or not).
  onClose: () => void;//function to hide the modal.
  onSave: (updatedTask: { title: string; description: string }) => void;//function to handle saving the edited task
}

export default function EditTaskModal({
  task,
  isOpen,
  onClose,
  onSave,
}: EditTaskModalProps) {
  //Local State Setup,Initializes local state from the task values.
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Sync state when task changes (e.g., switching between tasks without closing modal)
  //If the user opens the modal for a different task, the input fields update accordingly.
  // Without this, the form would still show old values.
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  //If isOpen is false, don't render anything.
  // Ensures the modal is hidden when it's not needed.
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-title"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 id="edit-task-title" className="text-2xl font-semibold mb-5 text-gray-800">
          Edit Task
        </h2>
        <input
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 mb-6 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex justify-end gap-3">
          <button
            className="px-5 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            onClick={() => onSave({ title, description })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}