import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Failed to log in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3EACB] to-[#E0C097]">
      <div className="bg-[#FAF3E0] shadow-xl rounded-lg p-8 max-w-md w-full border border-[#D8B384]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3E2F1D]">Welcome Back</h1>
          <p className="text-[#8C6A45] mt-2">Log in to Rise Up and break the barriers</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3E2F1D]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-[#C08C3A] rounded-md focus:ring-2 focus:ring-[#A67B5B] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3E2F1D]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-[#C08C3A] rounded-md focus:ring-2 focus:ring-[#A67B5B] focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-white font-medium rounded-md transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#C08C3A] hover:bg-[#A67B5B]"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#3E2F1D]">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-[#A67B5B] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
