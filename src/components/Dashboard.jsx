import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Play,
  BookOpen,
  User,
  Clock,
  Terminal,
  Activity,
  Code2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { initialQuestions } from "../data/questionsData";

export const Dashboard = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { user, userProgress } = useAuth();

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  // Real statistics derived directly from authenticated user's progress
  const attemptedIds = Array.isArray(userProgress?.attemptedQuestions) ? userProgress.attemptedQuestions : [];
  const solvedIds = Array.isArray(userProgress?.solvedQuestions) ? userProgress.solvedQuestions : [];
  const recentActivities = Array.isArray(userProgress?.activity) ? userProgress.activity : [];
  const activeLanguage = userProgress?.preferredLanguage || "Java";

  const attemptedCount = attemptedIds.length;
  const solvedCount = solvedIds.length;
  const successRate = attemptedCount > 0 ? Math.round((solvedCount / attemptedCount) * 100) : 0;

  // In-progress questions: attempted but not yet solved
  const inProgressQuestions = safeQuestions.filter(
    (q) => attemptedIds.includes(q.id) && !solvedIds.includes(q.id)
  );

  // Recommended questions: not yet solved
  const recommendedQuestions = safeQuestions.filter((q) => !solvedIds.includes(q.id)).slice(0, 4);

  const handleSolveChallenge = (qId) => {
    navigate(`/practice?qid=${qId}`);
  };

  return (
    <div className="dashboard-container">
      {/* Top Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div>
          <h1 className="dashboard-welcome-title">
            Welcome back, <span className="hero-gradient-text">{user?.name || "Developer"}</span>
          </h1>
          <p className="dashboard-welcome-sub">
            Track your coding progress, resume challenges, and run your solutions in real time.
          </p>
        </div>

        <div className="dashboard-quick-actions">
          <Link to="/practice" className="btn-primary">
            <Play size={15} fill="#fff" />
            Continue Practicing
          </Link>
          <Link to="/problems" className="btn-secondary">
            <BookOpen size={15} />
            Browse Problems
          </Link>
          <Link to="/profile" className="btn-secondary">
            <User size={15} />
            Profile
          </Link>
        </div>
      </div>

      {/* 4 Real Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="stat-card-label">Questions Solved</div>
            <div className="stat-card-value">{solvedCount}</div>
            <div className="stat-card-sub">
              {safeQuestions.length > 0 ? `of ${safeQuestions.length} available` : "No problems"}
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(255, 106, 0, 0.12)", color: "#ff6a00" }}>
            <Activity size={20} />
          </div>
          <div>
            <div className="stat-card-label">Questions Attempted</div>
            <div className="stat-card-value">{attemptedCount}</div>
            <div className="stat-card-sub">
              {attemptedCount === 0 ? "No attempts recorded" : "Distinct challenges tested"}
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#3b82f6" }}>
            <Code2 size={20} />
          </div>
          <div>
            <div className="stat-card-label">Success Rate</div>
            <div className="stat-card-value">{successRate}%</div>
            <div className="stat-card-sub">
              {attemptedCount > 0 ? `${solvedCount} solved / ${attemptedCount} attempted` : "No attempts yet"}
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-icon" style={{ background: "rgba(168, 85, 247, 0.12)", color: "#a855f7" }}>
            <Terminal size={20} />
          </div>
          <div>
            <div className="stat-card-label">Available Problems</div>
            <div className="stat-card-value">{safeQuestions.length}</div>
            <div className="stat-card-sub">Active language: {activeLanguage}</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Problems & Activity */}
      <div className="dashboard-two-cols">
        {/* Left Column: In Progress & Recommended */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* In Progress Challenges (if any) */}
          {inProgressQuestions.length > 0 && (
            <div className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Activity size={18} color="#ff8526" />
                  <h2 className="dashboard-panel-title">In Progress ({inProgressQuestions.length})</h2>
                </div>
              </div>

              <div className="dashboard-problems-list">
                {inProgressQuestions.map((q) => (
                  <div key={q.id} className="dashboard-problem-item">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span className="badge badge-medium">{q.difficulty}</span>
                        <span className="badge badge-lang" style={{ fontSize: "0.68rem" }}>
                          In Progress
                        </span>
                      </div>
                      <div className="dashboard-problem-title">{q.title}</div>
                      <div className="dashboard-problem-desc">{q.description}</div>
                    </div>

                    <button
                      className="btn-primary"
                      onClick={() => handleSolveChallenge(q.id)}
                      style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", whiteSpace: "nowrap" }}
                    >
                      <Play size={13} fill="#fff" />
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Problems */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BookOpen size={18} color="#ff6a00" />
                <h2 className="dashboard-panel-title">Recommended Problems</h2>
              </div>
              <Link to="/problems" className="dashboard-link-sub">
                View all ({safeQuestions.length})
              </Link>
            </div>

            <div className="dashboard-problems-list">
              {recommendedQuestions.length > 0 ? (
                recommendedQuestions.map((q) => (
                  <div key={q.id} className="dashboard-problem-item">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span className={`badge ${q.difficulty === "Easy" ? "badge-easy" : q.difficulty === "Medium" ? "badge-medium" : "badge-hard"}`}>
                          {q.difficulty}
                        </span>
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
                ))
              ) : (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>
                  All problems in the question bank have been solved. Great job!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={18} color="#ff6a00" />
              <h2 className="dashboard-panel-title">Recent Activity</h2>
            </div>
            <Link to="/profile" className="dashboard-link-sub">
              Profile History
            </Link>
          </div>

          <div className="dashboard-activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 6).map((act, i) => (
                <div key={act.id || i} className="dashboard-activity-item">
                  <div
                    className="activity-status-dot"
                    style={{ background: act.passed ? "#22c55e" : "#ff8526" }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div className="activity-item-title">
                      {act.passed ? "Solved" : "Attempted"}: <strong>{act.questionTitle}</strong>
                    </div>
                    <div className="activity-item-meta">
                      <span>{act.language}</span>
                      <span>&bull;</span>
                      <span style={{ color: act.passed ? "#22c55e" : "var(--text-muted)" }}>
                        {act.statusText || (act.passed ? "Accepted" : "Output Mismatch")}
                      </span>
                    </div>
                  </div>
                  <div className="activity-item-time">{act.timestamp}</div>
                </div>
              ))
            ) : (
              <div className="dashboard-empty-state">
                <Terminal size={32} color="var(--text-dim)" style={{ marginBottom: "0.75rem" }} />
                <p style={{ fontWeight: 600, color: "#fff" }}>No recent activity yet</p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.25rem", textAlign: "center" }}>
                  Run your code in the practice workspace to see your submission history here.
                </p>
                <Link to="/practice" className="btn-primary" style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                  Start Practicing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
