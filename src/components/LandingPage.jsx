import React from "react";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "./SparklesCore";
import { ArrowRight, Code2, Zap, Lock, Cpu, Play, ChevronRight, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { initialQuestions } from "../data/questionsData";

export const LandingPage = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  const handleSolveChallenge = (q) => {
    navigate(`/practice?qid=${q.id}`);
  };

  return (
    <div className="landing-container">
      {/* Hero Section with Canvas Particle Sparkles */}
      <section className="hero-section">
        <SparklesCore
          id="hero-sparkles"
          particleColor="#ff6a00"
          particleDensity={85}
          speed={1.4}
          minSize={1.2}
          maxSize={3.2}
        />

        <div className="hero-badge">
          <Zap size={14} />
          High-Speed Developer Arena
        </div>

        <h1 className="hero-title">
          Code, Compile, and Master Algorithms on <span className="hero-gradient-text">CodeForge</span>
        </h1>

        <p className="hero-subtitle">
          An intuitive coding environment with live multi-language compilation, real-time output validation, and a dynamic problem creation arena.
        </p>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={handleGetStarted}
            style={{ padding: "0.85rem 1.85rem", fontSize: "1.05rem" }}
          >
            {user ? "Go to Dashboard" : "Get Started (Demo)"}
            <ArrowRight size={18} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/practice")}
            style={{ padding: "0.85rem 1.6rem", fontSize: "1.05rem" }}
          >
            <Play size={18} color="#ff6a00" />
            Open Practice Workspace
          </button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Code2 size={22} />
          </div>
          <h3>External Cloud Compiler</h3>
          <p>
            Powered by high-performance Judge0 Cloud API execution for real native Java, Python, C, C++, and JavaScript execution.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Cpu size={22} />
          </div>
          <h3>5 Language Runtimes</h3>
          <p>
            Full support for Java, Python 3, C (GCC), C++, and JavaScript (Node.js) with remote execution metrics.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={22} />
          </div>
          <h3>Instant Validation</h3>
          <p>
            Verify algorithm solutions against automated test outputs and inspect execution metrics with exact matching.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Shield size={22} />
          </div>
          <h3>Student Progress Tracking</h3>
          <p>
            Track questions attempted, solved code, and user statistics stored safely in browser localStorage.
          </p>
        </div>
      </section>

      {/* Starter Challenges Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Starter Coding Challenges</h2>
          <p className="section-desc">
            Get started with these fundamental questions or create your own inside the platform.
          </p>
        </div>

        <div className="problem-cards-grid">
          {safeQuestions.slice(0, 3).map((q) => (
            <div key={q.id} className="problem-card">
              <div>
                <div className="problem-card-top">
                  <span className="badge badge-easy">{q.difficulty}</span>
                  <span className="badge badge-lang">{q.language || "Multi-Lang"}</span>
                </div>
                <h3 className="problem-title">{q.title}</h3>
                <p className="problem-desc">{q.description}</p>
              </div>

              <button
                className="btn-secondary"
                onClick={() => handleSolveChallenge(q)}
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Play size={14} color="#ff6a00" />
                  Solve Challenge
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
