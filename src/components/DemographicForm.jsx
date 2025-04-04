import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const DemographicForm = ({ setIsNewUser }) => { // ✅ Accept setIsNewUser as a prop

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Optionally preload existing data from Firestore if available.
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            setAge(data.age || "");
            setGender(data.gender || "");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { 
          name, 
          age, 
          gender, 
          isNewUser: false // ✅ Mark user as NOT new
        }, { merge: true });
  
        console.log("✅ User demographic data updated successfully!");
        
        // ✅ Update isNewUser state globally
        setIsNewUser(false); // <-- This ensures rerendering correctly
  
        navigate("/dashboard"); // Redirect after submission
      } catch (error) {
        console.error("❌ Error updating user data:", error.message);
        setError("Failed to update user data. Please try again.");
      }
    } else {
      setError("No authenticated user found.");
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#D9F0FF] to-[#A8D8EA]">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#034752] mb-4">Tell us about yourself</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-[#034752]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full mt-1 p-2 border border-[#A8D8EA] rounded-md"
              required
            />
          </div>
          {/* Age Field */}
          <div>
            <label className="block text-sm font-medium text-[#034752]">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                setError("");
              }}
              className="w-full mt-1 p-2 border border-[#A8D8EA] rounded-md"
              required
            />
          </div>
          {/* Gender Field */}
          <div>
            <label className="block text-sm font-medium text-[#034752]">Gender</label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setError("");
              }}
              className="w-full mt-1 p-2 border border-[#A8D8EA] rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full py-2 bg-[#10B981] text-white font-medium rounded-md hover:bg-[#034752]">
            Submit & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemographicForm;
