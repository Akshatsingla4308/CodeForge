import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  CheckCircle2,
  Activity,
  Code2,
  Edit2,
  Check,
  X,
  RotateCcw,
  Play,
  Clock,
  Sparkles,
  Award,
  Terminal
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { initialQuestions } from "../data/questionsData";

export const Profile = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { user, userProgress, updateProfile, resetUserProgress } = useAuth();

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  // Edit name state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const attemptedIds = userProgress?.attemptedQuestions || [];
  const solvedIds = userProgress?.solvedQuestions || [];
  const activities = userProgress?.activity || [];
  const currentLang = userProgress?.preferredLanguage || "Java";

  // Calculate stats
  const totalQuestions = safeQuestions.length;
  const attemptedCount = attemptedIds.length;
  const solvedCount = solvedIds.length;
  const accuracy = attemptedCount > 0 ? Math.round((solvedCount / attemptedCount) * 100) : 0;

  // Filter actual solved and attempted question objects
  const solvedQuestionObjects = safeQuestions.filter((q) => solvedIds.includes(q.id));
  const attemptedUnsolvedObjects = safeQuestions.filter(
    (q) => attemptedIds.includes(q.id) && !solvedIds.includes(q.id)
  );

  const handleSaveName = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      updateProfile(editName);
      setIsEditing(false);
    }
  };

  const handleResetProgress = () => {
    resetUserProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="profile-page-container">
      {/* Top Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-row">
          <div className="profile-avatar-badge">
            <User size={38} color="#fff" />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              {isEditing ? (
                <form onSubmit={handleSaveName} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="form-input"
                    style={{ padding: "0.35rem 0.75rem", fontSize: "1.1rem", fontWeight: 700 }}
                    autoFocus
                  />
                  <button type="submit" className="btn-primary" style={{ padding: "0.4rem 0.65rem" }} title="Save">
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setEditName(user?.name || "");
                      setIsEditing(false);
                    }}
                    style={{ padding: "0.4rem 0.65rem" }}
                    title="Cancel"
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <h1 className="profile-name">{user?.name || "Student Developer"}</h1>
                  <button
                    type="button"
                    className="btn-icon-subtle"
                    onClick={() => {
                      setEditName(user?.name || "");
                      setIsEditing(true);
                    }}
                    title="Edit Name"
                  >
                    <Edit2 size={15} />
                  </button>
                </div>
              )}

              <span className="badge badge-easy">Verified Demo Account</span>
            </div>

            <div className="profile-meta-row">
              <span className="profile-meta-item">
                <Mail size={14} color="#ff6a00" />
                {user?.email || "demo@codeforge.dev"}
              </span>
              <span className="profile-meta-item">
                <Calendar size={14} color="#ff6a00" />
                Joined: {user?.createdAt || "October 2026"}
              </span>
              <span className="profile-meta-item">
                <Award size={14} color="#ff6a00" />
                Role: {user?.role || "Developer"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
            <Link to="/practice" className="btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.88rem" }}>
              <Play size={14} fill="#fff" />
              Practice Arena
            </Link>

            {showResetConfirm ? (
              <div style={{ display: "flex", gap: "0.35rem" }}>
                <button
                  className="btn-secondary"
                  onClick={handleResetProgress}
                  style={{ color: "var(--red)", borderColor: "rgba(239, 68, 68, 0.4)", fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
                >
                  Confirm Reset
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowResetConfirm(false)}
                  style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn-secondary"
                onClick={() => setShowResetConfirm(true)}
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.65rem", color: "var(--text-muted)" }}
                title="Reset this user's attempted and solved stats"
              >
                <RotateCcw size={12} />
                Reset Stats
              </button>
            )}
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="profile-stats-bar">
          <div className="profile-stat-box">
            <span className="profile-stat-num">{solvedCount}</span>
            <span className="profile-stat-lbl">Questions Solved</span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-num">{attemptedCount}</span>
            <span className="profile-stat-lbl">Questions Attempted</span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-num">{accuracy}%</span>
            <span className="profile-stat-lbl">Success Rate</span>
          </div>

          <div className="profile-stat-box">
            <span className="profile-stat-num">{totalQuestions}</span>
            <span className="profile-stat-lbl">Total Problems in Bank</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Problems Breakdown & Languages/Activity */}
      <div className="profile-body-grid">
        {/* Left Column: Solved & Attempted Challenges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Solved Problems Box */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={18} color="#22c55e" />
                <h2 className="dashboard-panel-title">Solved Challenges ({solvedCount})</h2>
              </div>
            </div>

            <div className="profile-challenge-list">
              {solvedQuestionObjects.length > 0 ? (
                solvedQuestionObjects.map((q) => (
                  <div key={q.id} className="profile-challenge-item">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <h3 className="profile-challenge-title">{q.title}</h3>
                        <span className="badge badge-easy">{q.difficulty}</span>
                      </div>
                      <p className="profile-challenge-desc">{q.description}</p>
                    </div>

                    <button
                      className="btn-secondary"
                      onClick={() => navigate(`/practice?qid=${q.id}`)}
                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                    >
                      <Play size={12} color="#ff6a00" />
                      Review
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ color: "var(--text-dim)", padding: "1.25rem", textAlign: "center", fontSize: "0.88rem" }}>
                  No questions solved yet. Open the <Link to="/practice" style={{ color: "var(--orange-400)" }}>practice workspace</Link> to run and solve challenges!
                </div>
              )}
            </div>
          </div>

          {/* Attempted (In Progress) Problems */}
          {attemptedUnsolvedObjects.length > 0 && (
            <div className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Activity size={18} color="#ff8526" />
                  <h2 className="dashboard-panel-title">In Progress ({attemptedUnsolvedObjects.length})</h2>
                </div>
              </div>

              <div className="profile-challenge-list">
                {attemptedUnsolvedObjects.map((q) => (
                  <div key={q.id} className="profile-challenge-item">
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <h3 className="profile-challenge-title">{q.title}</h3>
                        <span className="badge badge-medium">{q.difficulty}</span>
                      </div>
                      <p className="profile-challenge-desc">{q.description}</p>
                    </div>

                    <button
                      className="btn-primary"
                      onClick={() => navigate(`/practice?qid=${q.id}`)}
                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                    >
                      <Play size={12} fill="#fff" />
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supported Languages Card */}
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Code2 size={18} color="#ff6a00" />
                <h2 className="dashboard-panel-title">Available Programming Environments</h2>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", padding: "1.25rem" }}>
              {[
                { name: "C", engine: "GCC 9.2.0" },
                { name: "C++", engine: "GCC 9.2.0" },
                { name: "Java", engine: "OpenJDK 17" },
                { name: "Python", engine: "Python 3.10" },
                { name: "JavaScript", engine: "Node.js 18.x" }
              ].map((l) => (
                <div
                  key={l.name}
                  onClick={() => navigate("/practice", { state: { language: l.name } })}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    cursor: "pointer",
                    transition: "border-color 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange-500)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{l.name}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>{l.engine}</div>
                  <div style={{ fontSize: "0.72rem", color: "#22c55e", marginTop: "0.4rem" }}>&bull; Judge0 Live</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Complete Activity Timeline */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={18} color="#ff6a00" />
              <h2 className="dashboard-panel-title">Activity Log & Submission History</h2>
            </div>
          </div>

          <div className="profile-activity-timeline">
            {activities.length > 0 ? (
              activities.map((act, i) => (
                <div key={act.id || i} className="profile-timeline-node">
                  <div
                    className="timeline-badge-marker"
                    style={{
                      background: act.passed ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 106, 0, 0.15)",
                      borderColor: act.passed ? "#22c55e" : "#ff8526",
                      color: act.passed ? "#22c55e" : "#ff8526"
                    }}
                  >
                    {act.passed ? <CheckCircle2 size={13} /> : <Terminal size={13} />}
                  </div>

                  <div className="timeline-node-content">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem" }}>
                        {act.passed ? "Solved:" : "Attempted:"} {act.questionTitle}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                        {act.timestamp}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
                      <span className="badge badge-lang" style={{ fontSize: "0.68rem" }}>
                        {act.language}
                      </span>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          color: act.passed ? "#22c55e" : "var(--text-muted)"
                        }}
                      >
                        {act.statusText || (act.passed ? "Accepted" : "Tested")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "var(--text-dim)", padding: "2rem", textAlign: "center", fontSize: "0.88rem" }}>
                No activity recorded for this user yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
