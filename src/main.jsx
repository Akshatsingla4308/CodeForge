import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error?.message || "Render Error" };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          backgroundColor: "#08080a",
          color: "#f4f4f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "'Outfit', sans-serif",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2rem", color: "#ff6a00", marginBottom: "1rem" }}>
            CodeForge Recovery
          </h1>
          <p style={{ color: "#9e9ea8", marginBottom: "1.5rem", maxWidth: "450px" }}>
            An unexpected error occurred. Click the button below to restore default data and resume coding.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: "linear-gradient(135deg, #ff6a00, #e65500)",
              color: "#fff",
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              border: "none"
            }}
          >
            Reset & Resume
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
