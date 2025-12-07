import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { register: firebaseRegister, googleLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await firebaseRegister(data.email, data.password);
      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error!", err.message.includes("weak-password") ? "Password should be at least 6 characters" : "Email already in use", "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      Swal.fire("Error!", "Google signup failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password (6+ chars, uppercase & lowercase)"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: "Must contain uppercase & lowercase letter",
                },
              })}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 👇️ এই বাটনটির স্টাইল পরিবর্তন করা হয়েছে */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
        </form>

        {/* 👇️ এই বাটনটির স্টাইল পরিবর্তন করা হয়েছে */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 mt-4 transition duration-300 ease-in-out text-gray-700 dark:text-gray-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}