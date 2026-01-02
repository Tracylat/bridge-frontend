import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Articles from  "./pages/Articles";
import Contact from "./pages/contact";
import About from "./pages/About";
import Benin from "./pages/BeninDiscovery";
import Team from "./pages/Team";
import AdminArticles from "./pages/AdminArticles";
import AdminClients from "./pages/AdminClients";
import ArticlePage from "./pages/ArticlePage";
import Dashboard from "./pages/Dashboard";

interface User {
  role: "admin" | "user";
  email: string;
  id?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );

  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/benin" element={<Benin />} />
        <Route path="/team" element={<Team />} />

        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

        {/* Dashboard client */}
        <Route
          path="/dashboard"
          element={
            user?.role === "user" ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/articles"
          element={
            user?.role === "admin" ? <AdminArticles /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/clients"
          element={
            user?.role === "admin" ? <AdminClients /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;