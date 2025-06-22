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
    formState: { errors, isSubmitting },
  } = useForm<TaskFormInput>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data: TaskFormInput) => {
    try {
      await axios.post("/tasks", data);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Add a New Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p id="title-error" className="text-red-600 mt-1 text-sm">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              className="w-full border border-gray-300 rounded-md p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p id="description-error" className="text-red-600 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
