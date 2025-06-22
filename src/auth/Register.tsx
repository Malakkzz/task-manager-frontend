import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterForm = z.infer<typeof schema>; // sar RegisterForm object b albo email and password

export default function Register() {
  // Form Hook Setup
  const {
    register, // 'register' links each input to the form
    handleSubmit, // 'handleSubmit' runs validation + calls onSubmit
    formState: { errors, isSubmitting }, // 'errors' holds any validation error messages
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) }); // 'resolver' connects Zod schema to react-hook-form.

  const navigate = useNavigate();

  // Handle Form Submission
  const onSubmit = async (data: RegisterForm) => {
    // 'data' contains the validated email and password
    try {
      await axios.post("http://localhost:3000/auth/signup", data); // We send it via POST to the backend’s /auth/signup route
      navigate("/login"); // On success, we redirect to login
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed"); // On failure, we show an alert with the error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
          Register
        </h2>
        {/* the form ui, this connects the form to handleSubmit(onSubmit) */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            //   Uses register("email") to bind this input to the form
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm">
              {/* Displays errors if any: */}
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p id="password-error" className="text-red-600 text-sm">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
