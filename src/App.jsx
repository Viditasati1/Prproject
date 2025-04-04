import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import BrahmacharyaBenefits from "./components/brahma";
import BrahmacharyaTasks from "./components/21days_task";
import Transformation from "./components/TransformationPage";
import TransformationTasks from "./components/Transformation";
import DemographicForm from "./components/DemographicForm"
import Forum from "./components/Forum";
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

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setIsNewUser(localStorage.getItem("isNewUser") === "true");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
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
        <Route path="/transformation" element={<TransformationTasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/brahma" element={<BrahmacharyaBenefits />} />
        <Route path="/21days" element={<BrahmacharyaTasks />} />

        <Route
          path="/demographic-info"
          element={user && isNewUser ? <DemographicForm /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={user && !isNewUser ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/assessment" element={<PersonalityTest />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route
          path="/"
          element={
            !user ? <Hero /> : <Navigate to={isNewUser ? "/demographic-info" : "/dashboard"} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

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