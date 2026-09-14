import React, { useState } from "react";
import { X, Lock, Mail, UserCheck, Shield } from "lucide-react";

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const username = email.includes("@") ? email.split("@")[0] : email;
    onLogin({
      name: username,
      email: email,
      role: "Developer"
    });
    onClose();
  };

  const handleQuickDemo = (roleName) => {
    onLogin({
      name: roleName === "Admin" ? "Admin User" : "Demo Developer",
      email: `${roleName.toLowerCase()}@codeforge.dev`,
      role: roleName
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="logo-badge" style={{ width: "28px", height: "28px" }}>
              <Lock size={15} />
            </div>
            <h2 className="modal-title">Sign In</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
          Simple client authentication. No backend database required.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.25rem" }}
                placeholder="developer@codeforge.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail size={15} style={{ position: "absolute", left: "0.75rem", color: "var(--text-dim)" }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="password"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.25rem" }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock size={15} style={{ position: "absolute", left: "0.75rem", color: "var(--text-dim)" }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            <UserCheck size={16} />
            Sign In to CodeForge
          </button>

          <div style={{ textAlign: "center", margin: "0.5rem 0", color: "var(--text-dim)", fontSize: "0.8rem" }}>
            or continue as demo
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleQuickDemo("Developer")}
              style={{ fontSize: "0.82rem", padding: "0.5rem" }}
            >
              Demo Dev
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleQuickDemo("Admin")}
              style={{ fontSize: "0.82rem", padding: "0.5rem" }}
            >
              Demo Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
