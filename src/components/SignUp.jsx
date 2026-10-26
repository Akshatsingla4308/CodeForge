import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Terminal, Lock, Mail, User, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { user, signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect directly to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must contain at least 6 characters.";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm password is required.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const result = signup(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setServerError(result.message || "Failed to create account.");
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Sign up to track your solved problems, accuracy rate, and coding activity.
          </p>
        </div>

        {/* Global Error Banner */}
        {serverError && (
          <div className="auth-error-alert">
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                autoComplete="name"
                required
              />
              <User size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
            {errors.name && <span className="field-error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="email"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                autoComplete="email"
                required
              />
              <Mail size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="password"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                autoComplete="new-password"
                required
              />
              <Lock size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
            {errors.password && <span className="field-error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="password"
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                autoComplete="new-password"
                required
              />
              <Lock size={16} style={{ position: "absolute", left: "0.85rem", color: "var(--text-dim)" }} />
            </div>
            {errors.confirmPassword && <span className="field-error-text">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem" }}
            disabled={isSubmitting}
          >
            <span>Create Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Link back to Sign In */}
        <div className="auth-footer-link">
          Already have an account?{" "}
          <Link to="/signin" className="auth-accent-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
