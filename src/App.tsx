import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from "./pages/Articles";
import Contact from "./pages/contact";
import About from "./pages/About";
import Benin from "./pages/BeninDiscovery";
import Team from "./pages/Team";
import AdminArticles from "./pages/AdminArticles";
import ArticlePage from "./pages/ArticlePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [userRole, setUserRole] = useState<"user" | "admin" | null>(
    localStorage.getItem("role") as "user" | "admin" | null
  );

  const handleLogin = (role: "user" | "admin") => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("auth", "true");
    localStorage.setItem("role", role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/benin" element={<Benin />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Routes admin protégées */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userRole === "admin" ? (
              <Navigate to="/admin/articles" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/articles"
          element={
            isAuthenticated && userRole === "admin" ? (
              <AdminArticles />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
