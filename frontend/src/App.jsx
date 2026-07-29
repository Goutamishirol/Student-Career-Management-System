import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Internships from "./pages/Internships";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
      
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>

        <Route index element={<Dashboard />} />

        <Route path="skills" element={<Skills />} />

        <Route path="certificates" element={<Certificates />} />

        <Route path="internships" element={<Internships />} />

        <Route path="profile" element={<Profile/>}/>

      </Route>

    </Routes>
  );
}

export default App;