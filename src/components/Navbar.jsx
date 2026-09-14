import React from "react";
import { Terminal, Code2, LogIn, LogOut, User, Lock, Unlock } from "lucide-react";

export const Navbar = ({
  currentView,
  setCurrentView,
  user,
  setIsLoginModalOpen,
  onLogout,
  isAdminUnlocked
}) => {
  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => setCurrentView("landing")}>
        <div className="logo-badge">
          <Terminal size={20} strokeWidth={2.5} />
        </div>
        <div className="brand-title">
          Code<span>Forge</span>
        </div>
      </div>

      <nav className="nav-links">
        <button
          className={`nav-btn ${currentView === "landing" ? "active" : ""}`}
          onClick={() => setCurrentView("landing")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${currentView === "compiler" ? "active" : ""}`}
          onClick={() => setCurrentView("compiler")}
        >
          <Code2 size={16} />
          Compiler & Problems
        </button>
      </nav>

      <div className="nav-auth">
        <button
          className={`nav-btn ${currentView === "admin" ? "active" : ""}`}
          onClick={() => setCurrentView("admin")}
          style={{
            border: "1px solid var(--border)",
            background: currentView === "admin" ? "var(--orange-bg)" : "var(--bg-surface)"
          }}
        >
          {isAdminUnlocked ? (
            <Unlock size={14} color="#ff6a00" />
          ) : (
            <Lock size={14} color="#ff6a00" />
          )}
          Admin Portal
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="user-tag">
              <span className="user-tag-dot"></span>
              <User size={14} />
              <span>{user.name}</span>
            </div>
            <button className="btn-secondary" onClick={onLogout} style={{ padding: "0.45rem 0.85rem" }}>
              <LogOut size={15} />
              Logout
            </button>
          </div>
        ) : (
          <button className="btn-secondary" onClick={() => setIsLoginModalOpen(true)}>
            <LogIn size={15} />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
