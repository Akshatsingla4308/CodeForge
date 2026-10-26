import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Terminal, Code2, LogIn, LogOut, User, Lock, Unlock, BookOpen, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ isAdminUnlocked }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="navbar">
      {/* Brand Logo */}
      <Link to={user ? "/dashboard" : "/"} className="nav-brand">
        <div className="logo-badge">
          <Terminal size={20} strokeWidth={2.5} />
        </div>
        <div className="brand-title">
          Code<span>Forge</span>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <nav className="nav-links">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className={`nav-btn ${isActive("/dashboard") ? "active" : ""}`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <Link
              to="/problems"
              className={`nav-btn ${isActive("/problems") ? "active" : ""}`}
            >
              <BookOpen size={16} />
              Problems
            </Link>

            <Link
              to="/practice"
              className={`nav-btn ${isActive("/practice") ? "active" : ""}`}
            >
              <Code2 size={16} />
              Practice
            </Link>

            <Link
              to="/profile"
              className={`nav-btn ${isActive("/profile") ? "active" : ""}`}
            >
              <User size={16} />
              Profile
            </Link>

            <Link
              to="/admin"
              className={`nav-btn ${isActive("/admin") ? "active" : ""}`}
            >
              {isAdminUnlocked ? <Unlock size={15} color="#22c55e" /> : <Lock size={15} color="#ff6a00" />}
              Admin
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className={`nav-btn ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
            <Link to="/signin" className={`nav-btn ${isActive("/signin") ? "active" : ""}`}>
              Sign In
            </Link>
            <Link to="/signup" className={`nav-btn ${isActive("/signup") ? "active" : ""}`}>
              Sign Up
            </Link>
          </>
        )}
      </nav>

      {/* Right Side Auth Controls */}
      <div className="nav-auth">
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link to="/profile" className="user-tag" style={{ textDecoration: "none" }}>
              <span className="user-tag-dot"></span>
              <User size={14} />
              <span>{user.name}</span>
            </Link>

            <button
              className="btn-secondary"
              onClick={handleLogout}
              style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
              title="Sign out of account"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link to="/signin" className="btn-secondary" style={{ padding: "0.45rem 0.9rem", textDecoration: "none" }}>
              <LogIn size={15} />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" className="btn-primary" style={{ padding: "0.45rem 0.9rem", textDecoration: "none" }}>
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
