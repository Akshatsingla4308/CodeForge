import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { CompilerWorkspace } from "./components/CompilerWorkspace";
import { AdminPortal } from "./components/AdminPortal";
import { LoginModal } from "./components/LoginModal";
import { initialQuestions } from "./data/questionsData";
import { Terminal } from "lucide-react";

export function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("codeforge_questions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10) {
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

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("codeforge_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("codeforge_questions", JSON.stringify(questions));
    } catch (e) {}
  }, [questions]);

  const handleLogin = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("codeforge_user", JSON.stringify(userData));
    } catch (e) {}
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("codeforge_user");
    } catch (e) {}
  };

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

  const handleSelectQuestion = (q) => {
    setActiveQuestionId(q.id);
    setCurrentView("compiler");
  };

  return (
    <div className="app-container">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        setIsLoginModalOpen={setIsLoginModalOpen}
        onLogout={handleLogout}
        isAdminUnlocked={isAdminUnlocked}
      />

      <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {currentView === "landing" && (
          <LandingPage
            onGetStarted={() => setCurrentView("compiler")}
            onSelectQuestion={handleSelectQuestion}
            questions={questions}
            onOpenAdmin={() => setCurrentView("admin")}
          />
        )}

        {currentView === "compiler" && (
          <CompilerWorkspace
            questions={questions}
            activeQuestionId={activeQuestionId}
            setActiveQuestionId={setActiveQuestionId}
          />
        )}

        {currentView === "admin" && (
          <AdminPortal
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onSelectQuestion={handleSelectQuestion}
            isAdminUnlocked={isAdminUnlocked}
            setIsAdminUnlocked={setIsAdminUnlocked}
          />
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <Terminal size={16} color="#ff6a00" />
          <span>CodeForge &bull; Online Developer Compiler & Arena</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div className="status-indicator">
            <span className="status-dot"></span>
            External Cloud Compiler API Active
          </div>
          <span>Black & Orange Edition</span>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
