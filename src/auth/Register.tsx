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
    formState: { errors }, // 'errors' holds any validation error messages
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) }); // 'resolver' connects Zod schema to react-hook-form.

  const navigate = useNavigate();


  // Handle Form Submission
  const onSubmit = async (data: RegisterForm) => { // 'data' contains the validated email and password
    try {
      await axios.post("http://localhost:3000/auth/signup", data); // We send it via POST to the backend’s /auth/signup route
      navigate("/login"); // On success, we redirect to login
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed"); // On failure, we show an alert with the error message
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

    {/* the form ui, this connects the form to handleSubmit(onSubmit) */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4"> 
        <input
          type="email"
          placeholder="Email"
        //   Uses register("email") to bind this input to the form
          {...register("email")}
          className="border p-2 rounded"
        />
        {/* Displays errors if any: */}
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
