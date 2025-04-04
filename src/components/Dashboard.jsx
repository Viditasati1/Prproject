import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // Get currently logged-in user
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch additional profile data from Firestore, if available.
    const fetchProfileData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching profile data:", error.message);
        }
      }
    };
    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to Home after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#cfe0e8] to-[#87bdd8] text-gray-900 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8">
        {/* User Welcome Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#034752]">
            Welcome, {profileData?.name || user?.displayName || "User"}! 🎉
          </h2>
          <p className="text-gray-600">Manage your account and explore features.</p>
        </div>

        {/* User Info Card */}
        <div className="flex flex-col items-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md border-4 border-[#87bdd8]"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-2xl font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="mt-3 text-lg font-semibold">{user?.email}</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { label: "Forum", path: "/forum" },
            { label: "Transform", path: "/transformation-resources" },
            { label: "TransformPage", path: "/transformation-start" },
            { label: "Assessment", path: "/assessment" },
            { label: "Analysis", path: "/analysis" },
          ].map(({ label, path }) => (
            <div
              key={label}
              className="bg-[#b7d7e8] text-gray-900 rounded-lg p-4 flex items-center justify-center text-lg font-semibold shadow-md cursor-pointer hover:bg-[#034752] hover:text-white transition-transform transform hover:scale-105"
              onClick={() => navigate(path)}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
