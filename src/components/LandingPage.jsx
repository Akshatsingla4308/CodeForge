import React from "react";
import { SparklesCore } from "./SparklesCore";
import { ArrowRight, Code2, Zap, Lock, Cpu, Play, CheckCircle2, ChevronRight } from "lucide-react";

export const LandingPage = ({ onGetStarted, onSelectQuestion, questions = [], onOpenAdmin }) => {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  return (
    <div className="landing-container">
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
          An intuitive coding environment with live Java compilation, real-time output validation, and a dynamic question creation portal.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onGetStarted} style={{ padding: "0.85rem 1.85rem", fontSize: "1.05rem" }}>
            Get Started
            <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={onOpenAdmin} style={{ padding: "0.85rem 1.6rem", fontSize: "1.05rem" }}>
            <Lock size={18} color="#ff6a00" />
            Admin Portal
          </button>
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Code2 size={22} />
          </div>
          <h3>External Cloud Compiler</h3>
          <p>
            Powered by high-performance external cloud execution APIs for real native Java, Python, C, and C++ compilation.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Cpu size={22} />
          </div>
          <h3>Multi-Language Roadmap</h3>
          <p>
            Java is live right now. Full support for Python, C, and C++ compilers is actively in development.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Zap size={22} />
          </div>
          <h3>Instant Validation</h3>
          <p>
            Verify solutions against automated test outputs and view execution metrics with exact matching.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Shield size={22} />
          </div>
          <h3>Question Authoring</h3>
          <p>
            Add questions seamlessly via the Admin Portal for any target language with custom input and expected output.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Starter Java Challenges</h2>
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
                  <span className="badge badge-lang">{q.language}</span>
                </div>
                <h3 className="problem-title">{q.title}</h3>
                <p className="problem-desc">{q.description}</p>
              </div>

              <button
                className="btn-secondary"
                onClick={() => onSelectQuestion(q)}
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
