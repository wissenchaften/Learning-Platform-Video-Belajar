import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Category from "./pages/Category/Category";
import ManageCourses from "./pages/ManageCourses/ManageCourses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/manage" element={<ManageCourses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/category" element={<Category />} />
    </Routes>
  );
}

export default App;
