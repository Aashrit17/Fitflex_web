import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./query"; // Adjust the import path

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useLogin(); // Initialize the useLogin mutation

  const handleLogin = () => {
    console.log("Attempting login with:", { email, password });
  
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      console.log("Error: Missing fields");
      return;
    }
  
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          console.log("Login successful:", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
          localStorage.setItem("userId", response.data.user.id); 
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setErrorMessage("Invalid credentials. Please try again.");
        },
      }
    );
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center">Welcome Back!</h2>
        <p className="text-gray-400 text-center mt-2">Log in to your account</p>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

        <div className="mt-6">
          <CustomTextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            icon="📧"
          />
          <CustomTextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            icon="🔒"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loginMutation.isPending} // Disable button while loading
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg mt-6 transition disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/register")}
            className="text-purple-300 hover:text-purple-400 transition"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

interface CustomTextFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  icon: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  type,
  value,
  onChange,
  icon,
}) => {
  return (
    <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800 p-3 mt-4">
      <span className="mr-3 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-white outline-none placeholder-gray-500"
      />
    </div>
  );
};

export default LoginView;