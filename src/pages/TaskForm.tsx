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
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
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
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
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
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
              className="w-full border border-gray-300 rounded-md p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p id="description-error" className="text-red-600 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            {/* Back button */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              aria-label="Go back to dashboard"
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-green-200 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>

            {/* Create Task button styled like Back with plus icon */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-green-200 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span>Create Task</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
