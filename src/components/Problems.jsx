import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Play, CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import { initialQuestions } from "../data/questionsData";
import { useAuth } from "../context/AuthContext";

export const Problems = ({ questions = [] }) => {
  const navigate = useNavigate();
  const { userProgress } = useAuth();

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const solvedIds = userProgress?.solvedQuestions || [];
  const attemptedIds = userProgress?.attemptedQuestions || [];

  // Filter questions based on search input and difficulty button
  const filteredQuestions = safeQuestions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "All" || q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  const handleSolve = (qId) => {
    navigate(`/practice?qid=${qId}`);
  };

  return (
    <div className="problems-page-container">
      {/* Header Banner */}
      <div className="problems-header">
        <div>
          <h1 className="problems-title">Problems</h1>
          <p className="problems-subtitle">
            Browse algorithm challenges, filter by difficulty, and practice in your preferred language.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="problems-filter-bar">
          <div className="search-box">
            <Search size={16} color="var(--text-dim)" />
            <input
              type="text"
              placeholder="Search challenges by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="difficulty-tabs">
            {["All", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                className={`difficulty-tab-btn ${difficultyFilter === diff ? "active" : ""}`}
                onClick={() => setDifficultyFilter(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Count & Status Summary */}
      <div className="problems-meta-bar">
        <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Showing <strong>{filteredQuestions.length}</strong> of <strong>{safeQuestions.length}</strong> problems
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }}></span>
            Solved: {solvedIds.length}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff8526" }}></span>
            Attempted: {attemptedIds.length}
          </span>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="problems-list-grid">
        {filteredQuestions.map((q, idx) => {
          const isSolved = solvedIds.includes(q.id);
          const isAttempted = attemptedIds.includes(q.id);

          return (
            <div key={q.id || idx} className={`problem-expanded-card ${isSolved ? "is-solved" : ""}`}>
              <div className="problem-card-top-row">
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="problem-index">#{idx + 1}</span>
                  <h2 className="problem-card-title">{q.title}</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {isSolved ? (
                    <span className="badge badge-easy">
                      <CheckCircle2 size={12} /> Solved
                    </span>
                  ) : isAttempted ? (
                    <span className="badge badge-lang">Attempted</span>
                  ) : null}

                  <span
                    className={`badge ${
                      q.difficulty === "Easy"
                        ? "badge-easy"
                        : q.difficulty === "Medium"
                        ? "badge-medium"
                        : "badge-hard"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>

              <p className="problem-card-desc">{q.description}</p>

              <div className="problem-card-specs">
                <div className="spec-item">
                  <span className="spec-label">Input Format:</span>
                  <span className="spec-val">{q.inputFormat || "Standard input"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Output Format:</span>
                  <span className="spec-val">{q.outputFormat || "Standard output"}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Sample Input:</span>
                  <code>{q.sampleInput || "None"}</code>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Expected Output:</span>
                  <code>{q.expectedOutput}</code>
                </div>
              </div>

              <div className="problem-card-action-bar">
                <span style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
                  Multi-language: Java, Python, C, C++, JavaScript
                </span>

                <button
                  className="btn-primary"
                  onClick={() => handleSolve(q.id)}
                  style={{ padding: "0.5rem 1.15rem", fontSize: "0.88rem" }}
                >
                  <Play size={14} fill="#fff" />
                  <span>Solve Challenge</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="no-problems-found">
            <Terminal size={36} color="var(--text-dim)" />
            <h3>No matching challenges found</h3>
            <p>Try adjusting your search query or difficulty filter.</p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter("All");
              }}
              style={{ marginTop: "1rem" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
