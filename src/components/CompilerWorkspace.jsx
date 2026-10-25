import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Play, RotateCcw, CheckCircle2, XCircle, Code2, Terminal, Info, Globe, Cpu } from "lucide-react";
import { executeExternalCode } from "../utils/javaRunner";
import { initialQuestions } from "../data/questionsData";
import { useAuth } from "../context/AuthContext";

export const CompilerWorkspace = ({ questions = [], activeQuestionId, setActiveQuestionId }) => {
  const location = useLocation();
  const { recordQuestionAttempt, userProgress } = useAuth();

  const [selectedLang, setSelectedLang] = useState("Java");
  const [langNotice, setLangNotice] = useState("");

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;
  const currentQuestion =
    safeQuestions.find((q) => q.id === activeQuestionId) || safeQuestions[0] || null;

  // Helper to get starter code for a specific language
  const getStarterCode = (q, lang) => {
    if (!q) return "";
    if (q.starterCodes && q.starterCodes[lang]) {
      return q.starterCodes[lang];
    }
    if (lang === "Java") {
      return q.starterCode || `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}`;
    }
    if (lang === "Python") {
      return `# Python 3.x solution\nprint("${q.expectedOutput || 'Hello'}")`;
    }
    if (lang === "C") {
      return `#include <stdio.h>\n\nint main() {\n    printf("${q.expectedOutput || 'Hello'}\\n");\n    return 0;\n}`;
    }
    if (lang === "C++") {
      return `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "${q.expectedOutput || 'Hello'}" << endl;\n    return 0;\n}`;
    }
    if (lang === "JavaScript") {
      return `// JavaScript (Node.js)\nconsole.log("${q.expectedOutput || 'Hello'}");`;
    }
    return q.starterCode || "";
  };

  const [code, setCode] = useState(() => getStarterCode(currentQuestion, "Java"));
  const [runResult, setRunResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Check URL params or location state for initial question or language
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qidFromParam = params.get("qid") || location.state?.questionId;
    const langFromParam = params.get("lang") || location.state?.language;

    if (qidFromParam && qidFromParam !== activeQuestionId) {
      if (typeof setActiveQuestionId === "function") {
        setActiveQuestionId(qidFromParam);
      }
    }

    if (langFromParam && ["Java", "Python", "C", "C++", "JavaScript"].includes(langFromParam)) {
      setSelectedLang(langFromParam);
    }
  }, [location.search, location.state]);

  // When question or language changes, update the editor code
  useEffect(() => {
    if (currentQuestion) {
      setCode(getStarterCode(currentQuestion, selectedLang));
      setRunResult(null);
    }
  }, [currentQuestion?.id, selectedLang]);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    if (lang !== "Java") {
      setLangNotice(`${lang} is fully supported via Judge0 Cloud Engine API.`);
    } else {
      setLangNotice("");
    }
  };

  const handleResetCode = () => {
    if (currentQuestion) {
      setCode(getStarterCode(currentQuestion, selectedLang));
      setRunResult(null);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setRunResult(null);

    // Call external Judge0 Cloud Engine API
    const result = await executeExternalCode(
      code || "",
      selectedLang,
      currentQuestion ? currentQuestion.expectedOutput || "" : "",
      currentQuestion ? currentQuestion.sampleInput || "" : ""
    );

    setRunResult(result);
    setIsRunning(false);

    // Record interaction in user's profile and progress state
    if (currentQuestion) {
      recordQuestionAttempt({
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        language: selectedLang,
        passed: result.passed,
        statusText: result.statusDesc
      });
    }
  };

  const safeCode = typeof code === "string" ? code : "";
  const lineCount = Math.max(safeCode.split("\n").length, 14);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Check if current question was already solved by this user
  const isQuestionSolved = userProgress?.solvedQuestions?.includes(currentQuestion?.id);

  return (
    <div className="workspace-layout">
      {/* Top Language Selector Bar */}
      <div className="language-bar">
        <div className="language-tabs">
          <button
            className={`lang-tab-btn ${selectedLang === "Java" ? "active" : ""}`}
            onClick={() => handleLanguageChange("Java")}
          >
            <Code2 size={16} />
            Java
            <span className="badge badge-easy" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
              Active
            </span>
          </button>
          <button
            className={`lang-tab-btn ${selectedLang === "Python" ? "active" : ""}`}
            onClick={() => handleLanguageChange("Python")}
          >
            Python
            <span className="badge badge-lang" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
              API Ready
            </span>
          </button>
          <button
            className={`lang-tab-btn ${selectedLang === "C" ? "active" : ""}`}
            onClick={() => handleLanguageChange("C")}
          >
            C
            <span className="badge badge-lang" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
              API Ready
            </span>
          </button>
          <button
            className={`lang-tab-btn ${selectedLang === "C++" ? "active" : ""}`}
            onClick={() => handleLanguageChange("C++")}
          >
            C++
            <span className="badge badge-lang" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
              API Ready
            </span>
          </button>
          <button
            className={`lang-tab-btn ${selectedLang === "JavaScript" ? "active" : ""}`}
            onClick={() => handleLanguageChange("JavaScript")}
          >
            JavaScript
            <span className="badge badge-lang" style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem" }}>
              Node.js
            </span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {langNotice && (
            <div className="lang-notice">
              <Info size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
              {langNotice}
            </div>
          )}

          <div className="user-tag" style={{ border: "1px solid var(--orange-border)" }}>
            <Globe size={13} color="#ff6a00" />
            <span style={{ fontSize: "0.8rem", color: "var(--orange-400)" }}>External API: Judge0 Cloud Engine</span>
          </div>
        </div>
      </div>

      {/* Horizontal Problem Strip */}
      <div className="problem-selector-strip">
        {safeQuestions.map((q, idx) => {
          const isSolved = userProgress?.solvedQuestions?.includes(q.id);
          return (
            <button
              key={q.id || idx}
              className={`problem-pill ${currentQuestion?.id === q.id ? "active" : ""}`}
              onClick={() => {
                if (typeof setActiveQuestionId === "function") {
                  setActiveQuestionId(q.id);
                }
              }}
            >
              <span>{idx + 1}.</span>
              <span>{q.title}</span>
              {isSolved ? (
                <span className="badge badge-easy" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
                  <CheckCircle2 size={10} /> Solved
                </span>
              ) : (
                <span className="badge badge-easy" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
                  {q.difficulty}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Two Column Workspace Layout */}
      <div className="workspace-panels">
        {/* Left Column: Problem Information */}
        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-header-title">
              <Info size={16} color="#ff6a00" />
              Problem Description
            </div>
            {currentQuestion && (
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {isQuestionSolved && (
                  <span className="badge badge-easy">
                    <CheckCircle2 size={12} /> Solved
                  </span>
                )}
                <span className="badge badge-easy">{currentQuestion.difficulty}</span>
              </div>
            )}
          </div>

          <div className="panel-body">
            {currentQuestion ? (
              <>
                <div className="detail-block">
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>
                    {currentQuestion.title}
                  </h2>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.35rem" }}>
                    <span className="badge badge-lang">{selectedLang}</span>
                  </div>
                </div>

                <div className="detail-block">
                  <div className="detail-label">Description</div>
                  <div className="detail-text">{currentQuestion.description}</div>
                </div>

                {currentQuestion.inputFormat && (
                  <div className="detail-block">
                    <div className="detail-label">Input Format</div>
                    <div className="detail-text">{currentQuestion.inputFormat}</div>
                  </div>
                )}

                {currentQuestion.outputFormat && (
                  <div className="detail-block">
                    <div className="detail-label">Output Format</div>
                    <div className="detail-text">{currentQuestion.outputFormat}</div>
                  </div>
                )}

                <div className="detail-block">
                  <div className="detail-label">Sample Input</div>
                  <div className="code-box">{currentQuestion.sampleInput || "None"}</div>
                </div>

                <div className="detail-block">
                  <div className="detail-label">Expected Output</div>
                  <div className="code-box">{currentQuestion.expectedOutput}</div>
                </div>
              </>
            ) : (
              <div style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>
                No problem selected. Please pick a challenge from the list above.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Console Output */}
        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-header-title">
              <Terminal size={16} color="#ff6a00" />
              <span>
                {selectedLang === "Java"
                  ? "Main.java"
                  : selectedLang === "Python"
                  ? "main.py"
                  : selectedLang === "C"
                  ? "main.c"
                  : selectedLang === "C++"
                  ? "main.cpp"
                  : "main.js"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="btn-secondary"
                onClick={handleResetCode}
                style={{ padding: "0.4rem 0.75rem", fontSize: "0.82rem" }}
              >
                <RotateCcw size={14} />
                Reset
              </button>

              <button
                className="btn-primary"
                onClick={handleRunCode}
                disabled={isRunning}
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
              >
                <Play size={14} fill="#fff" />
                {isRunning ? "Compiling via API..." : "Run Code"}
              </button>
            </div>
          </div>

          <div className="editor-area">
            <div className="editor-wrapper">
              <div className="line-numbers">
                {lineNumbers.map((num) => (
                  <div key={num}>{num}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="code-textarea code-font"
                spellCheck="false"
                autoCapitalize="none"
                autoComplete="off"
              />
            </div>

            <div className="console-panel">
              <div className="console-header">
                <div className="console-title">
                  <Terminal size={14} />
                  Remote Compiler Output
                </div>

                {runResult && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Time: {runResult.executionTime}
                    </span>
                    {runResult.memory && (
                      <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                        Mem: {runResult.memory}
                      </span>
                    )}
                    {runResult.passed ? (
                      <span className="badge badge-easy">
                        <CheckCircle2 size={12} />
                        Test Passed
                      </span>
                    ) : (
                      <span className="badge badge-hard">
                        <XCircle size={12} />
                        {runResult.statusDesc || "Failed"}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="console-body">
                {isRunning ? (
                  <div style={{ color: "var(--orange-400)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Cpu size={16} />
                    Connecting to external Judge0 compiler API & compiling code...
                  </div>
                ) : runResult ? (
                  <div>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <span style={{ color: "var(--text-dim)" }}>
                        [Remote API: {runResult.apiProvider}] {runResult.statusDesc}
                      </span>
                    </div>
                    <div style={{ color: runResult.success ? "#22c55e" : "#ef4444" }}>
                      {runResult.output}
                    </div>

                    {currentQuestion && runResult.success && (
                      <div
                        style={{
                          marginTop: "1rem",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid var(--border)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem"
                        }}
                      >
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          Expected: <code style={{ color: "#fff" }}>{currentQuestion.expectedOutput}</code>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          Actual: <code style={{ color: runResult.passed ? "#22c55e" : "#ff8526" }}>{runResult.output}</code>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ color: "var(--text-dim)" }}>
                    Press "Run Code" above to send code to the external compiler API.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
