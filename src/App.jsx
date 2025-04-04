import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth, db } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  About,
  Login,
  Signup,
  Dashboard,
  Contact,
  Tech,
  Footer,
  Hero,
  Navbar,
  StarsCanvas,
  PersonalityTest,
  Analysis,
} from "./components";
import Forum from "./components/Forum";
import DemographicForm from "./components/DemographicForm";
import Transformation from "./components/Transformation";
import TransformationPage from "./components/TransformationPage";

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(null); // Changed initial value to null
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Debugging logs
  useEffect(() => {
    console.log("User before fetching Firestore:", user);
  
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed. Current user:", currentUser);
      setUser(currentUser);
  
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          console.log("Firestore doc exists:", docSnap.exists());
  
          if (docSnap.exists()) {
            setIsNewUser(docSnap.data().isNewUser); // ✅ Update isNewUser correctly
          } else {
            setIsNewUser(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsNewUser(true);
        }
      } else {
        setIsNewUser(false);
      }
  
      console.log("Final values:", { user: currentUser, isNewUser });
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [user]); // ✅ Ensure it updates when user changes
  
  

  // ✅ Show loading until user state is set
  if (loading ) {
    return (
      <div className="flex items-center justify-center h-screen text-[#034752] text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/transformation-resources" element={<Transformation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/transformation-start" element={<TransformationPage />} />

        {/* ✅ Fix for infinite loop issue in redirection */}
        <Route
  path="/demographic-info"
  element={
    user ? (
      isNewUser ? (
        <DemographicForm setIsNewUser={setIsNewUser} /> // ✅ Pass setIsNewUser as a prop
      ) : (
        <Navigate to="/dashboard" replace />
      )
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

        <Route
          path="/dashboard"
          element={
            user ? (
              !isNewUser ? (
                <Dashboard />
              ) : (
                <Navigate to="/demographic-info" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/assessment" element={<PersonalityTest />} />
        <Route path="/analysis" element={<Analysis />} />

        {/* ✅ Fix redirect logic for home page */}
        <Route
          path="/"
          element={
            user ? (
              isNewUser ? <Navigate to="/demographic-info" replace /> : <Navigate to="/dashboard" replace />
            ) : (
              <Hero />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Render extra sections if not logged in */}
      {!user && (
        <>
          <About id="about" />
          <Tech />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-gradient-to-b from-[#F5F5DC] to-[#C0A080] ">
        <AppContent />
      </div>
    </BrowserRouter>
  );
};

export default App;
