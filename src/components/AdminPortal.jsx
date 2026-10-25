import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Shield, Trash2, Check, ExternalLink, Lock, Unlock, AlertCircle } from "lucide-react";

export const AdminPortal = ({
  questions = [],
  onAddQuestion,
  onDeleteQuestion,
  onSelectQuestion,
  isAdminUnlocked,
  setIsAdminUnlocked
}) => {
  const navigate = useNavigate();
  const [enteredPass, setEnteredPass] = useState("");
  const [passError, setPassError] = useState("");

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("Java");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [starterCode, setStarterCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Result");
    }
}`);
  const [successMsg, setSuccessMsg] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPass === "1234") {
      setIsAdminUnlocked(true);
      setPassError("");
      setEnteredPass("");
    } else {
      setPassError("Incorrect password. Enter 1234 to unlock.");
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    if (lang === "Java") {
      setStarterCode(`public class Main {
    public static void main(String[] args) {
        System.out.println("Output");
    }
}`);
    } else if (lang === "Python") {
      setStarterCode(`def solution():\n    print("Output")\n\nsolution()`);
    } else if (lang === "C") {
      setStarterCode(`#include <stdio.h>\n\nint main() {\n    printf("Output\\n");\n    return 0;\n}`);
    } else if (lang === "C++") {
      setStarterCode(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Output" << endl;\n    return 0;\n}`);
    } else if (lang === "JavaScript") {
      setStarterCode(`// JavaScript (Node.js)\nconsole.log("Output");`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !expectedOutput.trim()) {
      alert("Please provide at least a title and expected output.");
      return;
    }

    const newQuestion = {
      id: "custom-" + Date.now(),
      title: title.trim(),
      language,
      difficulty,
      description: description.trim() || "Complete the solution to match the expected output.",
      inputFormat: inputFormat.trim() || "Standard input",
      outputFormat: outputFormat.trim() || "Standard output",
      sampleInput: sampleInput.trim() || "None",
      expectedOutput: expectedOutput.trim(),
      starterCode: starterCode.trim()
    };

    onAddQuestion(newQuestion);
    setSuccessMsg(`Question "${title}" added successfully!`);

    setTitle("");
    setDescription("");
    setInputFormat("");
    setOutputFormat("");
    setSampleInput("");
    setExpectedOutput("");

    setTimeout(() => {
      setSuccessMsg("");
    }, 3500);
  };

  if (!isAdminUnlocked) {
    return (
      <div className="admin-wrapper" style={{ display: "flex", justifyContent: "center", paddingTop: "4rem" }}>
        <div className="modal-card" style={{ maxWidth: "420px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              className="logo-badge"
              style={{ width: "48px", height: "48px", margin: "0 auto 1rem", borderRadius: "12px" }}
            >
              <Lock size={24} />
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>Admin Authentication</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "0.4rem" }}>
              Enter administrator passcode to access problem creation.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Admin Passcode</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ width: "100%", paddingLeft: "2.25rem" }}
                  placeholder="Enter passcode"
                  value={enteredPass}
                  onChange={(e) => {
                    setEnteredPass(e.target.value);
                    setPassError("");
                  }}
                  autoFocus
                  required
                />
                <Lock size={15} style={{ position: "absolute", left: "0.75rem", color: "var(--text-dim)" }} />
              </div>
            </div>

            {passError && (
              <div
                style={{
                  color: "var(--red)",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem"
                }}
              >
                <AlertCircle size={14} />
                {passError}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              <Unlock size={16} />
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
            Admin Management Portal
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Create and manage coding challenges for Java, Python, C, and C++.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="user-tag" style={{ border: "1px solid var(--orange-border)" }}>
            <Shield size={14} color="#ff6a00" />
            <span style={{ color: "var(--orange-400)" }}>Admin Authenticated</span>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setIsAdminUnlocked(false)}
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
          >
            <Lock size={14} />
            Lock Portal
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h2 className="admin-card-title">
          <PlusCircle size={20} color="#ff6a00" />
          Add New Problem
        </h2>

        {successMsg && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "var(--green-bg)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "8px",
              color: "var(--green)",
              fontSize: "0.9rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Check size={16} />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Question Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Find Max Element"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Language</label>
              <select className="form-select" value={language} onChange={handleLanguageChange}>
                <option value="Java">Java (Active)</option>
                <option value="Python">Python (Active)</option>
                <option value="C">C (Active)</option>
                <option value="C++">C++ (Active)</option>
                <option value="JavaScript">JavaScript (Active)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty Level</label>
              <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Expected Output *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 100 or Hello"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Problem Description</label>
              <textarea
                className="form-textarea"
                placeholder="Explain the problem requirements and rules..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sample Input</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. [4, 9, 2]"
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Input Format</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Array of integers"
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Starter Code Template</label>
              <textarea
                className="form-textarea code-font"
                style={{ minHeight: "130px" }}
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
            <PlusCircle size={16} />
            Publish Problem
          </button>
        </form>
      </div>

      <div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
          Published Challenges ({questions.length})
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span className="badge badge-lang">{q.language}</span>
                  <span className="badge badge-easy">{q.difficulty}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>{q.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{q.description}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    if (typeof onSelectQuestion === "function") {
                      onSelectQuestion(q);
                    }
                    navigate(`/practice?qid=${q.id}`);
                  }}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
                >
                  <ExternalLink size={14} />
                  Test in Workspace
                </button>

                {questions.length > 1 && (
                  <button
                    className="btn-secondary"
                    onClick={() => onDeleteQuestion(q.id)}
                    style={{ padding: "0.45rem 0.65rem", color: "var(--red)" }}
                    title="Delete Question"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
