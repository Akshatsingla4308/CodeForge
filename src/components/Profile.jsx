import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  CheckCircle2,
  Activity,
  Edit2,
  Check,
  X,
  RotateCcw,
  Play,
  Clock,
  Terminal,
  Code2
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

  const attemptedIds = Array.isArray(userProgress?.attemptedQuestions) ? userProgress.attemptedQuestions : [];
  const solvedIds = Array.isArray(userProgress?.solvedQuestions) ? userProgress.solvedQuestions : [];
  const activities = Array.isArray(userProgress?.activity) ? userProgress.activity : [];

  // Real statistics
  const totalQuestions = safeQuestions.length;
  const attemptedCount = attemptedIds.length;
  const solvedCount = solvedIds.length;
  const accuracy = attemptedCount > 0 ? Math.round((solvedCount / attemptedCount) * 100) : 0;

  // Solved and in-progress question objects
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
            <User size={36} color="#fff" />
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
                  <h1 className="profile-name">{user?.name || "Developer"}</h1>
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
            </div>

            <div className="profile-meta-row">
              {user?.email && (
                <span className="profile-meta-item">
                  <Mail size={14} color="#ff6a00" />
                  {user.email}
                </span>
              )}
              {user?.createdAt && (
                <span className="profile-meta-item">
                  <Calendar size={14} color="#ff6a00" />
                  Member since {user.createdAt}
                </span>
              )}
              {user?.role && (
                <span className="profile-meta-item">
                  <Code2 size={14} color="#ff6a00" />
                  {user.role}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
            <Link to="/practice" className="btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.88rem" }}>
              <Play size={14} fill="#fff" />
              Practice Workspace
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
                title="Reset progress statistics"
              >
                <RotateCcw size={12} />
                Reset Stats
              </button>
            )}
          </div>
        </div>

        {/* Real Stats Row */}
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
            <span className="profile-stat-lbl">Available Problems</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Solved/In-Progress & Activity Log */}
      <div className="profile-body-grid">
        {/* Left Column: Solved & Attempted Challenges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Solved Problems Panel */}
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
                        <span className={`badge ${q.difficulty === "Easy" ? "badge-easy" : q.difficulty === "Medium" ? "badge-medium" : "badge-hard"}`}>
                          {q.difficulty}
                        </span>
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
                <div style={{ color: "var(--text-dim)", padding: "1.75rem", textAlign: "center", fontSize: "0.88rem" }}>
                  No challenges solved yet. Visit the <Link to="/practice" style={{ color: "var(--orange-400)" }}>practice workspace</Link> to run and solve problems.
                </div>
              )}
            </div>
          </div>

          {/* In Progress Challenges (if any) */}
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
                        <span className={`badge ${q.difficulty === "Easy" ? "badge-easy" : q.difficulty === "Medium" ? "badge-medium" : "badge-hard"}`}>
                          {q.difficulty}
                        </span>
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
        </div>

        {/* Right Column: Submission History */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={18} color="#ff6a00" />
              <h2 className="dashboard-panel-title">Submission History</h2>
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
                        {act.statusText || (act.passed ? "Accepted" : "Output Mismatch")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "var(--text-dim)", padding: "2.5rem 1.5rem", textAlign: "center", fontSize: "0.88rem" }}>
                No submissions recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
