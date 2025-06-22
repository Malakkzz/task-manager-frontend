import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      ); // Sends the email + password to /auth/login endpoint
      const token = response.data.access_token; // If login is successful, backend sends a JWT token

      localStorage.setItem("token", token); // Stores the JWT so we can use it later for authenticated requests
      navigate("/dashboard"); // Redirect to task dashboard
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* New register message + button below the form */}
        <div className="mt-6 text-center text-gray-700">
          <p className="mb-2">Don't have an account yet?</p>
          <Link
            to="/register"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
