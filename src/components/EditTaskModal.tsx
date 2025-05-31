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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <input
          className="w-full p-2 border mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full p-2 border mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave({ title, description })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
