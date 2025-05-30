import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type TaskFormInput = z.infer<typeof schema>;

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInput>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data: TaskFormInput) => {
    try {
      await axios.post("/tasks", data);
      navigate("/"); // go back to dashboard
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
