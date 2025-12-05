import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("location", data.location);
    formData.append("description", data.description);
    formData.append("amount", data.amount);
    formData.append("email", user.email);

    try {
      const res = await fetch("http://localhost:5000/api/issues", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Issue reported successfully!",
          timer: 2000,
        });
        reset();
        navigate("/my-issues");
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to connect to server", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container-max">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Report a New Issue
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Issue Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                placeholder="e.g. Overflowing Garbage Bin"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select
                {...register("category", { required: "Please select a category" })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-700"
              >
                <option value="">-- Select Category --</option>
                <option value="Garbage">Garbage</option>
                <option value="Illegal Construction">Illegal Construction</option>
                <option value="Broken Public Property">Broken Public Property</option>
                <option value="Road Damage">Road Damage</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-700"
                placeholder="e.g. Mirpur 10, Dhaka"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows="4"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-700"
                placeholder="Describe the issue in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Suggested Budget (BDT)</label>
              <input
                type="number"
                {...register("amount", { required: "Amount is required", min: 1 })}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-700"
                placeholder="e.g. 500"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Photo is required" })}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="btn-primary text-xl px-12 py-4"
              >
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}