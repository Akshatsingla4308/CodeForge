import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { Problems } from "./components/Problems";
import { CompilerWorkspace } from "./components/CompilerWorkspace";
import { Profile } from "./components/Profile";
import { AdminPortal } from "./components/AdminPortal";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { initialQuestions } from "./data/questionsData";
import { Terminal } from "lucide-react";

// AppContent handles rendering routes within AuthContext and Router
function AppContent() {
  // Questions state loaded from localStorage or initialQuestions
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("codeforge_questions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        }
      }
      return initialQuestions;
    } catch (e) {
      return initialQuestions;
    }
  });

  const [activeQuestionId, setActiveQuestionId] = useState(() => {
    return initialQuestions[0]?.id || "q-1";
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Sync questions with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("codeforge_questions", JSON.stringify(questions));
    } catch (e) {}
  }, [questions]);

  const handleAddQuestion = (newQ) => {
    setQuestions((prev) => [newQ, ...prev]);
    setActiveQuestionId(newQ.id);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (activeQuestionId === id) {
      const remaining = questions.filter((q) => q.id !== id);
      if (remaining.length > 0) {
        setActiveQuestionId(remaining[0].id);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Universal CodeForge Navigation Header */}
      <Navbar isAdminUnlocked={isAdminUnlocked} />

      {/* Main Dynamic View Area via React Router */}
      <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage questions={questions} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes for Demo Students */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard questions={questions} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems questions={questions} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <CompilerWorkspace
                  questions={questions}
                  activeQuestionId={activeQuestionId}
                  setActiveQuestionId={setActiveQuestionId}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile questions={questions} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPortal
                  questions={questions}
                  onAddQuestion={handleAddQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                  isAdminUnlocked={isAdminUnlocked}
                  setIsAdminUnlocked={setIsAdminUnlocked}
                />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Universal Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <Terminal size={16} color="#ff6a00" />
          <span>CodeForge &bull; Online Developer Compiler & Arena</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Judge0 Cloud API Active (5 Runtimes)
          </div>
          <span>Black & Orange Edition</span>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
