import React, { useState } from "react";
import { createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      console.log("🔄 Setting authentication persistence...");
      await setPersistence(auth, browserSessionPersistence);
  
      console.log("🆕 Creating user...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ User created:", user);
  
      console.log("📝 Saving user data to Firestore...");
      await setDoc(doc(db, "users", user.uid), { isNewUser: true });
      console.log("✅ User document created in Firestore");
  
      navigate("/demographic-info");
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError(err.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F3EACB] to-[#E0C097]">
      <div className="bg-[#FAF3E0] shadow-lg rounded-lg p-8 max-w-md w-full border border-[#D8B384]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3E2F1D]">Create Account</h1>
          <p className="text-[#8C6A45] mt-2 font-medium">Join Rise Up and break the barriers</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3E2F1D]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full mt-1 p-2 border border-[#C08C3A] rounded-md focus:ring-2 focus:ring-[#A67B5B]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3E2F1D]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full mt-1 p-2 border border-[#C08C3A] rounded-md focus:ring-2 focus:ring-[#A67B5B]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full py-2 bg-[#C08C3A] text-white font-medium rounded-md hover:bg-[#A67B5B] transition-colors">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#3E2F1D]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#A67B5B] font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
