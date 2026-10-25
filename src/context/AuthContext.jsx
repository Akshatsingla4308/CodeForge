import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Authentication Context
const AuthContext = createContext(null);

// Default Demo Credentials required for evaluation
const DEMO_EMAIL = "demo@codeforge.dev";
const DEMO_PASSWORD = "CodeForge123";

// Demo-only pseudo hashing function (for evaluation purposes, never claim this is production-secure)
const hashPassword = (pwd) => {
  try {
    return btoa("codeforge_demo_salt_" + pwd);
  } catch (e) {
    return "demo_hash_" + pwd;
  }
};

// Initial sample activity data for the demo user
const getInitialDemoProgress = () => ({
  attemptedQuestions: ["q-1", "q-2", "q-3"],
  solvedQuestions: ["q-1", "q-2"],
  preferredLanguage: "Java",
  activity: [
    {
      id: "act-1",
      questionId: "q-1",
      questionTitle: "Hello World",
      language: "Java",
      passed: true,
      timestamp: "Yesterday at 4:30 PM",
      statusText: "Accepted"
    },
    {
      id: "act-2",
      questionId: "q-2",
      questionTitle: "Sum of Two Numbers",
      language: "Java",
      passed: true,
      timestamp: "Today at 10:15 AM",
      statusText: "Accepted"
    },
    {
      id: "act-3",
      questionId: "q-3",
      questionTitle: "Even or Odd",
      language: "Python",
      passed: false,
      timestamp: "Today at 11:45 AM",
      statusText: "Output Mismatch"
    }
  ]
});

export const AuthProvider = ({ children }) => {
  // 1. Current logged-in user state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("codeforge_current_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      return null;
    }
  });

  // 2. User-specific progress (attempted questions, solved questions, activity log)
  const [userProgress, setUserProgress] = useState(() => {
    try {
      const savedUser = localStorage.getItem("codeforge_current_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const savedProgress = localStorage.getItem(`codeforge_progress_${u.email}`);
        if (savedProgress) {
          return JSON.parse(savedProgress);
        }
        if (u.email === DEMO_EMAIL) {
          return getInitialDemoProgress();
        }
      }
      return {
        attemptedQuestions: [],
        solvedQuestions: [],
        preferredLanguage: "Java",
        activity: []
      };
    } catch (err) {
      return {
        attemptedQuestions: [],
        solvedQuestions: [],
        preferredLanguage: "Java",
        activity: []
      };
    }
  });

  // Sync user progress whenever active user changes
  useEffect(() => {
    if (user?.email) {
      try {
        const key = `codeforge_progress_${user.email}`;
        const savedProgress = localStorage.getItem(key);
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress));
        } else if (user.email === DEMO_EMAIL) {
          const init = getInitialDemoProgress();
          localStorage.setItem(key, JSON.stringify(init));
          setUserProgress(init);
        } else {
          const initNew = {
            attemptedQuestions: [],
            solvedQuestions: [],
            preferredLanguage: "Java",
            activity: []
          };
          localStorage.setItem(key, JSON.stringify(initNew));
          setUserProgress(initNew);
        }
      } catch (err) {
        console.error("Error loading user progress:", err);
      }
    }
  }, [user?.email]);

  // Ensure demo account is seeded in localStorage accounts list
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      let accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
      const hasDemo = accounts.some((acc) => acc.email.toLowerCase() === DEMO_EMAIL.toLowerCase());

      if (!hasDemo) {
        accounts.push({
          id: "demo-user-01",
          name: "Demo Developer",
          email: DEMO_EMAIL,
          passwordHash: hashPassword(DEMO_PASSWORD),
          createdAt: "2026-10-01"
        });
        localStorage.setItem("codeforge_accounts", JSON.stringify(accounts));
      }
    } catch (err) {
      console.error("Error initializing accounts:", err);
    }
  }, []);

  // Login handler
  const login = (email, password) => {
    try {
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPass = (password || "").trim();

      // Check standard demo credentials directly
      if (cleanEmail === DEMO_EMAIL.toLowerCase() && cleanPass === DEMO_PASSWORD) {
        const demoUser = {
          id: "demo-user-01",
          name: "Demo Developer",
          email: DEMO_EMAIL,
          role: "Developer",
          createdAt: "2026-10-01"
        };
        setUser(demoUser);
        localStorage.setItem("codeforge_current_user", JSON.stringify(demoUser));

        // Load or create demo progress
        const demoProgKey = `codeforge_progress_${DEMO_EMAIL}`;
        if (!localStorage.getItem(demoProgKey)) {
          const init = getInitialDemoProgress();
          localStorage.setItem(demoProgKey, JSON.stringify(init));
          setUserProgress(init);
        }
        return { success: true };
      }

      // Check registered accounts in localStorage
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      const accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
      const enteredHash = hashPassword(cleanPass);

      const found = accounts.find(
        (acc) => acc.email.toLowerCase() === cleanEmail && acc.passwordHash === enteredHash
      );

      if (found) {
        const loggedUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: "Developer",
          createdAt: found.createdAt || new Date().toISOString().split("T")[0]
        };
        setUser(loggedUser);
        localStorage.setItem("codeforge_current_user", JSON.stringify(loggedUser));
        return { success: true };
      }

      return {
        success: false,
        message: "Invalid credentials. Use demo@codeforge.dev / CodeForge123 or create an account."
      };
    } catch (err) {
      return { success: false, message: "Authentication error: " + err.message };
    }
  };

  // Sign up handler
  const signup = (name, email, password) => {
    try {
      const cleanName = (name || "").trim();
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPass = (password || "").trim();

      const savedAccounts = localStorage.getItem("codeforge_accounts");
      const accounts = savedAccounts ? JSON.parse(savedAccounts) : [];

      // Check if email already registered
      if (accounts.some((acc) => acc.email.toLowerCase() === cleanEmail)) {
        return { success: false, message: "An account with this email already exists." };
      }

      const newAccount = {
        id: "user-" + Date.now(),
        name: cleanName,
        email: cleanEmail,
        passwordHash: hashPassword(cleanPass),
        createdAt: new Date().toISOString().split("T")[0]
      };

      accounts.push(newAccount);
      localStorage.setItem("codeforge_accounts", JSON.stringify(accounts));

      // Auto login user after successful signup
      const loggedUser = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: "Developer",
        createdAt: newAccount.createdAt
      };

      setUser(loggedUser);
      localStorage.setItem("codeforge_current_user", JSON.stringify(loggedUser));

      // Create blank progress record
      const blankProg = {
        attemptedQuestions: [],
        solvedQuestions: [],
        preferredLanguage: "Java",
        activity: []
      };
      localStorage.setItem(`codeforge_progress_${cleanEmail}`, JSON.stringify(blankProg));
      setUserProgress(blankProg);

      return { success: true };
    } catch (err) {
      return { success: false, message: "Signup error: " + err.message };
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem("codeforge_current_user");
  };

  // Update profile name
  const updateProfile = (newName) => {
    if (!user) return;
    const updatedUser = { ...user, name: newName.trim() };
    setUser(updatedUser);
    localStorage.setItem("codeforge_current_user", JSON.stringify(updatedUser));

    // Update in accounts array too
    try {
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      if (savedAccounts) {
        const accounts = JSON.parse(savedAccounts);
        const updated = accounts.map((acc) =>
          acc.email.toLowerCase() === user.email.toLowerCase() ? { ...acc, name: newName.trim() } : acc
        );
        localStorage.setItem("codeforge_accounts", JSON.stringify(updated));
      }
    } catch (e) {}
  };

  // Record an attempt and test execution result
  const recordQuestionAttempt = ({ questionId, questionTitle, language, passed, statusText }) => {
    if (!user?.email) return;

    setUserProgress((prev) => {
      // 1. Add to attempted questions if not already there
      const attempted = prev.attemptedQuestions.includes(questionId)
        ? prev.attemptedQuestions
        : [...prev.attemptedQuestions, questionId];

      // 2. Add to solved questions only if genuinely passed, avoiding duplicate counting
      let solved = prev.solvedQuestions;
      if (passed && !prev.solvedQuestions.includes(questionId)) {
        solved = [...prev.solvedQuestions, questionId];
      }

      // 3. Create activity entry with timestamp
      const newActivity = {
        id: "act-" + Date.now(),
        questionId,
        questionTitle: questionTitle || "Coding Challenge",
        language: language || "Java",
        passed: Boolean(passed),
        timestamp: "Just now",
        statusText: statusText || (passed ? "Accepted" : "Failed")
      };

      // Keep recent 15 activities
      const updatedActivity = [newActivity, ...(prev.activity || []).slice(0, 14)];

      const updatedProgress = {
        ...prev,
        attemptedQuestions: attempted,
        solvedQuestions: solved,
        preferredLanguage: language || prev.preferredLanguage || "Java",
        activity: updatedActivity
      };

      try {
        localStorage.setItem(`codeforge_progress_${user.email}`, JSON.stringify(updatedProgress));
      } catch (err) {
        console.error("Failed saving progress:", err);
      }

      return updatedProgress;
    });
  };

  // Reset user's progress if requested during testing/demo
  const resetUserProgress = () => {
    if (!user?.email) return;
    const cleanProgress = {
      attemptedQuestions: [],
      solvedQuestions: [],
      preferredLanguage: "Java",
      activity: []
    };
    setUserProgress(cleanProgress);
    localStorage.setItem(`codeforge_progress_${user.email}`, JSON.stringify(cleanProgress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProgress,
        login,
        signup,
        logout,
        updateProfile,
        recordQuestionAttempt,
        resetUserProgress,
        demoEmail: DEMO_EMAIL,
        demoPassword: DEMO_PASSWORD
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext cleanly
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
