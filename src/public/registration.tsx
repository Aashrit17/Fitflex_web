import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegister } from "./query"; // Import the API call

const RegistrationView: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [profilePicture, setProfilePicture] = useState<string | null>(null); // Changed to string
  const registerMutation = useRegister();
  const navigate = useNavigate();

  // Submit function to handle the registration form
  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Log the data before sending it
    console.log("Registration Data Being Sent:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      image: profilePicture || undefined, // Log the image (base64 string)
    });
  
    // Call the mutation to register the user
    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: profilePicture || undefined, // Send the base64 image string
      },
      {
        onSuccess: () => {
          navigate("/"); // Navigate after successful registration
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        },
      }
    );
  };
  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      // Read the file and convert it to base64
      reader.onloadend = () => {
        setProfilePicture(reader.result as string); // Save the base64 string
      };
      
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-400">Create an Account</h2>
        <p className="text-gray-400 text-center mt-2">Register to get started</p>

        {/* Profile Image Upload */}
        <div className="mt-6 flex justify-center">
          <label className="relative cursor-pointer">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full border-2 border-purple-400"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                📷
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <CustomTextField label="Full Name" type="text" {...register("name")} icon="👤" />
          <CustomTextField label="Email" type="email" {...register("email")} icon="📧" />
          <CustomTextField label="Phone Number" type="tel" {...register("phone")} icon="📞" />
          <CustomTextField label="Password" type="password" {...register("password")} icon="🔒" />
          <CustomTextField label="Confirm Password" type="password" {...register("confirmPassword")} icon="🔒" />

          {/* Terms Checkbox */}
          <div className="flex items-center mt-4">
            <input type="checkbox" {...register("termsAccepted")} className="mr-2" required />
            <span className="text-gray-400 text-sm">I agree to the Terms and Conditions</span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg mt-6 transition"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-4 text-center">
          <button onClick={() => navigate("/forgot-password")} className="text-purple-300 hover:text-purple-400">
            Forgot Password?
          </button>
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => navigate("/")} className="text-purple-300 hover:text-purple-400">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Custom Text Field Component
interface CustomTextFieldProps {
  label: string;
  type: string;
  icon: string;
}

const CustomTextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ label, type, icon, ...props }, ref) => {
    return (
      <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800 p-3">
        <span className="mr-3 text-gray-400">{icon}</span>
        <input
          type={type}
          placeholder={label}
          className="w-full bg-transparent text-white outline-none placeholder-gray-500"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default RegistrationView;
