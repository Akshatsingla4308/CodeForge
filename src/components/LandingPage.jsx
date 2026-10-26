import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Cpu, Play, ChevronRight, CheckCircle2, Terminal } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { initialQuestions } from "../data/questionsData";

export const LandingPage = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Terminal size={14} />
          Online Coding Practice
        </div>

        <h1 className="hero-title">
          Code, Compile, and Practice on <span className="hero-gradient-text">CodeForge</span>
        </h1>

        <p className="hero-subtitle">
          An interactive coding environment with multi-language execution, instant test-case validation, and personal progress tracking.
        </p>

        <div className="hero-actions">
          {user ? (
            <>
              <button
                className="btn-primary"
                onClick={() => navigate("/dashboard")}
                style={{ padding: "0.8rem 1.6rem", fontSize: "1rem" }}
              >
                Go to Dashboard
                <ArrowRight size={17} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/practice")}
                style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}
              >
                <Play size={16} color="#ff6a00" />
                Practice Workspace
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-primary"
                onClick={() => navigate("/signin")}
                style={{ padding: "0.8rem 1.6rem", fontSize: "1rem" }}
              >
                Start Practicing
                <ArrowRight size={17} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/problems")}
                style={{ padding: "0.8rem 1.5rem", fontSize: "1rem" }}
              >
                Browse Problems
              </button>
            </>
          )}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Code2 size={20} />
          </div>
          <h3>Multi-Language Compiler</h3>
          <p>
            Execute solutions in Java, Python, C, C++, and JavaScript powered by Judge0 Cloud API runtimes.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <CheckCircle2 size={20} />
          </div>
          <h3>Output Validation</h3>
          <p>
            Verify code output against sample inputs and expected results with clear pass/fail status reporting.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Cpu size={20} />
          </div>
          <h3>Curated Problems</h3>
          <p>
            Solve algorithm problems categorized by difficulty, each with structured inputs, outputs, and starter code.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Terminal size={20} />
          </div>
          <h3>Personal Progress</h3>
          <p>
            Track solved challenges, submission history, and success rates tied directly to your account.
          </p>
        </div>
      </section>

      {/* Starter Challenges Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Practice Problems</h2>
          <p className="section-desc">
            Explore challenges from the question bank to test your problem-solving skills.
          </p>
        </div>

        <div className="problem-cards-grid">
          {safeQuestions.slice(0, 3).map((q) => (
            <div key={q.id} className="problem-card">
              <div>
                <div className="problem-card-top">
                  <span className={`badge ${q.difficulty === "Easy" ? "badge-easy" : q.difficulty === "Medium" ? "badge-medium" : "badge-hard"}`}>
                    {q.difficulty}
                  </span>
                  <span className="badge badge-lang">{q.language || "Multi-Lang"}</span>
                </div>
                <h3 className="problem-title">{q.title}</h3>
                <p className="problem-desc">{q.description}</p>
              </div>

              <button
                className="btn-secondary"
                onClick={() => navigate(user ? `/practice?qid=${q.id}` : "/signin")}
                style={{ width: "100%", justifyContent: "space-between", marginTop: "1rem" }}
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
