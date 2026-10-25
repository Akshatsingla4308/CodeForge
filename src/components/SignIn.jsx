import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Terminal, Lock, Mail, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const SignIn = () => {
  const navigate = useNavigate();
  const { user, login, demoEmail, demoPassword } = useAuth();

  // If already authenticated, redirect directly to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Local state for form inputs and validation feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick auto-fill helper for live evaluation presentation
  const handleFillDemo = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMessage("");
  };

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
      // Redirect authenticated user to Dashboard
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
          <div className="logo-badge" style={{ margin: "0 auto 1rem", width: "48px", height: "48px" }}>
            <Terminal size={24} />
          </div>
          <h1 className="auth-title">
            Sign In to Code<span>Forge</span>
          </h1>
          <p className="auth-subtitle">
            Enter your credentials to access your coding dashboard and practice workspace.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="demo-credentials-banner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <CheckCircle2 size={16} color="#ff6a00" />
            <strong style={{ color: "#fff", fontSize: "0.88rem" }}>Evaluation Demo Credentials</strong>
          </div>
          <div className="demo-creds-row">
            <span>Email: <code>{demoEmail}</code></span>
            <span>Password: <code>{demoPassword}</code></span>
          </div>
          <button
            type="button"
            className="btn-demo-fill"
            onClick={handleFillDemo}
          >
            Click to Auto-Fill Demo Account
          </button>
          <div style={{ fontSize: "0.74rem", color: "var(--text-dim)", marginTop: "0.4rem" }}>
            * Demonstrator mode: Client-side session saved in browser localStorage.
          </div>
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

        {/* Link to Sign Up */}
        <div className="auth-footer-link">
          Don't have an account yet?{" "}
          <Link to="/signup" className="auth-accent-link">
            Create Demo Account
          </Link>
        </div>
      </div>
    </div>
  );
};
