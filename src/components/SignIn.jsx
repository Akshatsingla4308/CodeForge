import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Terminal, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const SignIn = () => {
  const navigate = useNavigate();
  const { user, login, defaultEmail, defaultPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect directly to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    const result = login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMessage(result.message || "Invalid credentials.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-header">
          <Link to="/" className="nav-brand" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
            <div className="logo-badge">
              <Terminal size={20} strokeWidth={2.5} />
            </div>
            <div className="brand-title">
              Code<span>Forge</span>
            </div>
          </Link>
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">
            Enter your credentials to access your workspace and problem library.
          </p>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="email"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
                autoComplete="email"
                required
              />
              <Mail size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="password"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                autoComplete="current-password"
                required
              />
              <Lock size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
            disabled={isSubmitting}
          >
            <span>Sign In</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Subtle evaluation credentials hint */}
        <div className="auth-eval-note">
          <span>Demonstration account:</span> <code>{defaultEmail}</code> / <code>{defaultPassword}</code>
        </div>

        {/* Link to Sign Up */}
        <div className="auth-footer-link">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-accent-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
