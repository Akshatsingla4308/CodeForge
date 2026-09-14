const LANGUAGE_MAP = {
  Java: 62,
  Python: 71,
  C: 50,
  "C++": 54
};

export async function executeExternalCode(code, language = "Java", expectedOutput = "", stdin = "") {
  const languageId = LANGUAGE_MAP[language] || 62;

  if (!code || !code.trim()) {
    return {
      success: false,
      output: "Error: Code buffer is empty.",
      passed: false,
      executionTime: "0ms",
      apiProvider: "Judge0 Cloud Engine"
    };
  }

  try {
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin === "None" ? "" : stdin
      })
    });

    if (!response.ok) {
      throw new Error(`External API HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const stdout = (data.stdout || "").trim();
    const stderr = (data.stderr || "").trim();
    const compileOutput = (data.compile_output || "").trim();
    const statusDesc = data.status?.description || "Completed";
    const execTime = data.time ? `${Math.round(parseFloat(data.time) * 1000)}ms` : "N/A";
    const memory = data.memory ? `${Math.round(data.memory / 1024)}MB` : "N/A";

    if (compileOutput) {
      return {
        success: false,
        output: compileOutput,
        passed: false,
        executionTime: execTime,
        memory,
        statusDesc,
        apiProvider: "Judge0 Cloud Compiler"
      };
    }

    if (stderr) {
      return {
        success: false,
        output: stderr,
        passed: false,
        executionTime: execTime,
        memory,
        statusDesc,
        apiProvider: "Judge0 Cloud Compiler"
      };
    }

    const cleanOutput = stdout || "(No output produced)";
    const cleanExpected = (expectedOutput || "").replace(/\r/g, "").trim();
    const isPassed = cleanExpected !== "" && stdout.replace(/\r/g, "").trim() === cleanExpected;

    return {
      success: true,
      output: cleanOutput,
      passed: Boolean(isPassed),
      executionTime: execTime,
      memory,
      statusDesc,
      apiProvider: "Judge0 Cloud Compiler"
    };
  } catch (err) {
    return {
      success: false,
      output: `External API Connection Error: ${err.message}`,
      passed: false,
      executionTime: "0ms",
      apiProvider: "Judge0 Cloud Compiler"
    };
  }
}
