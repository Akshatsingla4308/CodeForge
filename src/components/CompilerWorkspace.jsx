import React, { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, XCircle, Code2, Terminal, Info, Globe, Cpu } from "lucide-react";
import { executeExternalCode } from "../utils/javaRunner";
import { initialQuestions } from "../data/questionsData";

export const CompilerWorkspace = ({ questions = [], activeQuestionId, setActiveQuestionId }) => {
  const [selectedLang, setSelectedLang] = useState("Java");
  const [langNotice, setLangNotice] = useState("");

  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : initialQuestions;
  const currentQuestion =
    safeQuestions.find((q) => q.id === activeQuestionId) || safeQuestions[0] || null;

  const [code, setCode] = useState(currentQuestion ? currentQuestion.starterCode || "" : "");
  const [runResult, setRunResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (currentQuestion) {
      setCode(currentQuestion.starterCode || "");
      setRunResult(null);
    }
  }, [currentQuestion?.id]);

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    if (lang !== "Java") {
      setLangNotice(`${lang} is supported via external API execution.`);
    } else {
      setLangNotice("");
    }
  };

  const handleResetCode = () => {
    if (currentQuestion) {
      setCode(currentQuestion.starterCode || "");
      setRunResult(null);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setRunResult(null);

    const result = await executeExternalCode(
      code || "",
      selectedLang,
      currentQuestion ? currentQuestion.expectedOutput || "" : "",
      currentQuestion ? currentQuestion.sampleInput || "" : ""
    );

    setRunResult(result);
    setIsRunning(false);
  };

  const safeCode = typeof code === "string" ? code : "";
  const lineCount = Math.max(safeCode.split("\n").length, 14);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="workspace-layout">
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

      <div className="problem-selector-strip">
        {safeQuestions.map((q, idx) => (
          <button
            key={q.id || idx}
            className={`problem-pill ${currentQuestion?.id === q.id ? "active" : ""}`}
            onClick={() => setActiveQuestionId(q.id)}
          >
            <span>{idx + 1}.</span>
            <span>{q.title}</span>
            <span className="badge badge-easy" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>
              {q.difficulty}
            </span>
          </button>
        ))}
      </div>

      <div className="workspace-panels">
        <div className="panel-card">
          <div className="panel-header">
            <div className="panel-header-title">
              <Info size={16} color="#ff6a00" />
              Problem Description
            </div>
            {currentQuestion && (
              <span className="badge badge-easy">{currentQuestion.difficulty}</span>
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
                    <span className="badge badge-lang">{currentQuestion.language}</span>
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
                  : "main.cpp"}
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
                    Connecting to external compiler API & compiling code...
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
