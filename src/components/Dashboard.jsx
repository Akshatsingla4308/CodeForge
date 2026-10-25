import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  Cpu,
  BookOpen,
  User,
  Clock,
  Sparkles,
  Terminal,
  Activity
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { initialQuestions } from "../data/questionsData";

export const Dashboard = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { user, userProgress } = useAuth();

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  // Retrieve actual demo interaction stats from localStorage-backed userProgress
  const attemptedCount = userProgress?.attemptedQuestions?.length || 0;
  const solvedCount = userProgress?.solvedQuestions?.length || 0;
  const currentLang = userProgress?.preferredLanguage || "Java";
  const recentActivities = userProgress?.activity || [];

  // Available languages list
  const availableLanguages = [
    {
      name: "Java",
      version: "OpenJDK 17",
      desc: "Object-oriented powerhouse for enterprise algorithms and data structures.",
      badge: "Active",
      badgeClass: "badge-easy"
    },
    {
      name: "Python",
      version: "Python 3.10",
      desc: "Clean syntax, dynamic typing, and rapid problem-solving execution.",
      badge: "API Live",
      badgeClass: "badge-lang"
    },
    {
      name: "C",
      version: "GCC 9.2.0",
      desc: "Low-level system programming with direct memory control and pointers.",
      badge: "API Live",
      badgeClass: "badge-lang"
    },
    {
      name: "C++",
      version: "GCC 9.2.0",
      desc: "High-performance programming with STL algorithms and fast execution.",
      badge: "API Live",
      badgeClass: "badge-lang"
    },
    {
      name: "JavaScript",
      version: "Node.js 18.x",
      desc: "Modern asynchronous scripting for algorithm problem solving and web logic.",
      badge: "API Live",
      badgeClass: "badge-lang"
    }
  ];

  // Quick navigation handler when a language card is clicked
  const handleSelectLanguage = (langName) => {
    navigate("/practice", { state: { language: langName } });
  };

  // Quick navigation handler when a challenge is clicked
  const handleSolveChallenge = (qId) => {
    navigate(`/practice?qid=${qId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Top Welcome Header */}
      <div className="dashboard-welcome-banner">
        <div>
          <div className="dashboard-pill">
            <Sparkles size={14} color="#ff6a00" />
            <span>Developer Learning Space</span>
          </div>
          <h1 className="dashboard-welcome-title">
            Welcome back, <span className="hero-gradient-text">{user?.name || "Developer"}</span> 👋
          </h1>
          <p className="dashboard-welcome-sub">
            Track your coding progress, launch compiler workspaces, and conquer algorithm challenges.
          </p>
        </div>

        <div className="dashboard-quick-actions">
          <Link to="/practice" className="btn-primary">
            <Play size={15} fill="#fff" />
            Open Practice Workspace
          </Link>
          <Link to="/problems" className="btn-secondary">
            <BookOpen size={15} />
            Browse Problems
          </Link>
          <Link to="/profile" className="btn-secondary">
            <User size={15} />
            My Profile
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(255, 106, 0, 0.12)", color: "#ff6a00" }}>
            <Activity size={20} />
          </div>
          <div>
            <div className="stat-card-label">Questions Attempted</div>
            <div className="stat-card-value">{attemptedCount}</div>
            <div className="stat-card-sub">Recorded in localStorage</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="stat-card-label">Questions Solved</div>
            <div className="stat-card-value">{solvedCount}</div>
            <div className="stat-card-sub">
              {attemptedCount > 0
                ? `${Math.round((solvedCount / attemptedCount) * 100)}% accuracy rate`
                : "No attempts yet"}
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
            <Code2 size={20} />
          </div>
          <div>
            <div className="stat-card-label">Active Language</div>
            <div className="stat-card-value" style={{ fontSize: "1.35rem" }}>
              {currentLang}
            </div>
            <div className="stat-card-sub">5 languages supported</div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(168, 85, 247, 0.12)", color: "#a855f7" }}>
            <Terminal size={20} />
          </div>
          <div>
            <div className="stat-card-label">Total Arena Challenges</div>
            <div className="stat-card-value">{safeQuestions.length}</div>
            <div className="stat-card-sub">Ready for live testing</div>
          </div>
        </div>
      </div>

      {/* Programming Languages Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2 className="dashboard-section-title">Supported Programming Languages</h2>
            <p className="dashboard-section-desc">
              Select a language to launch the CodeForge compiler workspace with Judge0 Cloud Execution.
            </p>
          </div>
        </div>

        <div className="languages-grid">
          {availableLanguages.map((lang) => (
            <div
              key={lang.name}
              className="language-card"
              onClick={() => handleSelectLanguage(lang.name)}
              title={`Click to practice in ${lang.name}`}
            >
              <div className="language-card-top">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div className="language-badge-icon">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h3 className="language-card-name">{lang.name}</h3>
                    <span className="language-card-version">{lang.version}</span>
                  </div>
                </div>
                <span className={`badge ${lang.badgeClass}`}>{lang.badge}</span>
              </div>

              <p className="language-card-desc">{lang.desc}</p>

              <button
                type="button"
                className="btn-language-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectLanguage(lang.name);
                }}
              >
                <span>Practice in {lang.name}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recommended Problems & Recent Activity */}
      <div className="dashboard-two-cols">
        {/* Left Column: Recommended Questions */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BookOpen size={18} color="#ff6a00" />
              <h2 className="dashboard-panel-title">Recommended Coding Challenges</h2>
            </div>
            <Link to="/problems" className="dashboard-link-sub">
              View all ({safeQuestions.length})
            </Link>
          </div>

          <div className="dashboard-problems-list">
            {safeQuestions.slice(0, 4).map((q) => {
              const isSolved = userProgress?.solvedQuestions?.includes(q.id);
              const isAttempted = userProgress?.attemptedQuestions?.includes(q.id);

              return (
                <div key={q.id} className="dashboard-problem-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span className="badge badge-easy">{q.difficulty}</span>
                      {isSolved && (
                        <span className="badge badge-easy" style={{ fontSize: "0.68rem" }}>
                          <CheckCircle2 size={10} /> Solved
                        </span>
                      )}
                      {!isSolved && isAttempted && (
                        <span className="badge badge-lang" style={{ fontSize: "0.68rem" }}>
                          Attempted
                        </span>
                      )}
                    </div>
                    <div className="dashboard-problem-title">{q.title}</div>
                    <div className="dashboard-problem-desc">{q.description}</div>
                  </div>

                  <button
                    className="btn-secondary"
                    onClick={() => handleSolveChallenge(q.id)}
                    style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                  >
                    <Play size={13} color="#ff6a00" />
                    Solve
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={18} color="#ff6a00" />
              <h2 className="dashboard-panel-title">Recent Coding Activity</h2>
            </div>
            <Link to="/profile" className="dashboard-link-sub">
              Full Record
            </Link>
          </div>

          <div className="dashboard-activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 5).map((act, i) => (
                <div key={act.id || i} className="dashboard-activity-item">
                  <div
                    className="activity-status-dot"
                    style={{ background: act.passed ? "#22c55e" : "#ff8526" }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div className="activity-item-title">
                      {act.passed ? "Solved" : "Attempted"} <strong>{act.questionTitle}</strong>
                    </div>
                    <div className="activity-item-meta">
                      <span>Language: {act.language}</span>
                      <span>&bull;</span>
                      <span>{act.statusText || (act.passed ? "Accepted" : "Tested")}</span>
                    </div>
                  </div>
                  <div className="activity-item-time">{act.timestamp}</div>
                </div>
              ))
            ) : (
              <div className="dashboard-empty-state">
                <Terminal size={32} color="var(--text-dim)" style={{ marginBottom: "0.5rem" }} />
                <p>No recent activity yet.</p>
                <Link to="/practice" className="btn-primary" style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
                  Run your first program
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
