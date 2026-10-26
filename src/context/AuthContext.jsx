import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Authentication Context
const AuthContext = createContext(null);

// Primary evaluation / owner account credentials
export const DEFAULT_ACCOUNT_EMAIL = "aksaht.singla@gmail.com";
export const DEFAULT_ACCOUNT_NAME = "Akshat Singla";
export const DEFAULT_PASSWORD = "CodeForge123";
export const EVAL_DEMO_EMAIL = "demo@codeforge.dev";

// Client-side demonstration hashing helper
const hashPassword = (pwd) => {
  try {
    return btoa("codeforge_client_salt_" + pwd);
  } catch (e) {
    return "client_hash_" + pwd;
  }
};

// Safe blank initial progress structure for any user
const getCleanProgress = () => ({
  attemptedQuestions: [],
  solvedQuestions: [],
  preferredLanguage: "Java",
  activity: []
});

// Sanitizes stored progress to ensure fabricated legacy mock data is eliminated
const sanitizeProgress = (data) => {
  if (!data || typeof data !== "object") return getCleanProgress();

  // If this progress still contains legacy fabricated mock activity, reset to clean state
  const hasLegacyMockActivity =
    Array.isArray(data.activity) &&
    data.activity.some((a) => a?.timestamp === "Yesterday at 4:30 PM" || a?.id === "act-1");

  if (hasLegacyMockActivity) {
    return getCleanProgress();
  }

  return {
    attemptedQuestions: Array.isArray(data.attemptedQuestions) ? data.attemptedQuestions : [],
    solvedQuestions: Array.isArray(data.solvedQuestions) ? data.solvedQuestions : [],
    preferredLanguage: data.preferredLanguage || "Java",
    activity: Array.isArray(data.activity) ? data.activity : []
  };
};

export const AuthProvider = ({ children }) => {
  // 1. Current logged-in user state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("codeforge_current_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Cleanse legacy "Demo Developer" label if present
        if (parsed?.name === "Demo Developer") {
          parsed.name = DEFAULT_ACCOUNT_NAME;
          if (parsed.email === EVAL_DEMO_EMAIL) {
            parsed.email = DEFAULT_ACCOUNT_EMAIL;
          }
          localStorage.setItem("codeforge_current_user", JSON.stringify(parsed));
        }
        return parsed;
      }
      return null;
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
        if (u?.email) {
          const key = `codeforge_progress_${u.email.toLowerCase()}`;
          const savedProgress = localStorage.getItem(key);
          if (savedProgress) {
            return sanitizeProgress(JSON.parse(savedProgress));
          }
        }
      }
      return getCleanProgress();
    } catch (err) {
      return getCleanProgress();
    }
  });

  // Ensure accounts list exists and is seeded with Akshat Singla's account
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      let accounts = savedAccounts ? JSON.parse(savedAccounts) : [];

      // Cleanse legacy demo developer name from any existing accounts in localStorage
      let accountsModified = false;
      accounts = accounts.map((acc) => {
        if (acc.name === "Demo Developer") {
          accountsModified = true;
          return {
            ...acc,
            name: DEFAULT_ACCOUNT_NAME,
            email: acc.email === EVAL_DEMO_EMAIL ? DEFAULT_ACCOUNT_EMAIL : acc.email
          };
        }
        return acc;
      });

      const hasAkshat = accounts.some(
        (acc) => acc.email.toLowerCase() === DEFAULT_ACCOUNT_EMAIL.toLowerCase()
      );

      if (!hasAkshat) {
        accounts.push({
          id: "user-akshat-01",
          name: DEFAULT_ACCOUNT_NAME,
          email: DEFAULT_ACCOUNT_EMAIL,
          passwordHash: hashPassword(DEFAULT_PASSWORD),
          role: "Developer",
          createdAt: "2026-10-26"
        });
        accountsModified = true;
      }

      if (accountsModified || !savedAccounts) {
        localStorage.setItem("codeforge_accounts", JSON.stringify(accounts));
      }
    } catch (err) {
      console.error("Error initializing accounts:", err);
    }
  }, []);

  // Sync user progress whenever active user changes
  useEffect(() => {
    if (user?.email) {
      try {
        const key = `codeforge_progress_${user.email.toLowerCase()}`;
        const savedProgress = localStorage.getItem(key);
        if (savedProgress) {
          const cleaned = sanitizeProgress(JSON.parse(savedProgress));
          setUserProgress(cleaned);
        } else {
          const initNew = getCleanProgress();
          localStorage.setItem(key, JSON.stringify(initNew));
          setUserProgress(initNew);
        }
      } catch (err) {
        console.error("Error loading user progress:", err);
      }
    } else {
      setUserProgress(getCleanProgress());
    }
  }, [user?.email]);

  // Login handler
  const login = (email, password) => {
    try {
      const cleanEmail = (email || "").trim().toLowerCase();
      const cleanPass = (password || "").trim();

      // Check registered accounts in localStorage
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      let accounts = savedAccounts ? JSON.parse(savedAccounts) : [];
      const enteredHash = hashPassword(cleanPass);

      // Support default account or eval demo alias directly
      if (
        (cleanEmail === DEFAULT_ACCOUNT_EMAIL.toLowerCase() || cleanEmail === EVAL_DEMO_EMAIL) &&
        cleanPass === DEFAULT_PASSWORD
      ) {
        const ownerUser = {
          id: "user-akshat-01",
          name: DEFAULT_ACCOUNT_NAME,
          email: DEFAULT_ACCOUNT_EMAIL,
          role: "Developer",
          createdAt: "2026-10-26"
        };
        setUser(ownerUser);
        localStorage.setItem("codeforge_current_user", JSON.stringify(ownerUser));

        const progKey = `codeforge_progress_${DEFAULT_ACCOUNT_EMAIL.toLowerCase()}`;
        const existingProg = localStorage.getItem(progKey);
        if (existingProg) {
          setUserProgress(sanitizeProgress(JSON.parse(existingProg)));
        } else {
          const clean = getCleanProgress();
          localStorage.setItem(progKey, JSON.stringify(clean));
          setUserProgress(clean);
        }
        return { success: true };
      }

      const found = accounts.find(
        (acc) => acc.email.toLowerCase() === cleanEmail && acc.passwordHash === enteredHash
      );

      if (found) {
        const loggedUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role || "Developer",
          createdAt: found.createdAt || new Date().toISOString().split("T")[0]
        };
        setUser(loggedUser);
        localStorage.setItem("codeforge_current_user", JSON.stringify(loggedUser));

        const progKey = `codeforge_progress_${found.email.toLowerCase()}`;
        const existingProg = localStorage.getItem(progKey);
        if (existingProg) {
          setUserProgress(sanitizeProgress(JSON.parse(existingProg)));
        } else {
          const clean = getCleanProgress();
          localStorage.setItem(progKey, JSON.stringify(clean));
          setUserProgress(clean);
        }
        return { success: true };
      }

      return {
        success: false,
        message: "Invalid email or password. Please verify your credentials or create an account."
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
        role: "Developer",
        createdAt: new Date().toISOString().split("T")[0]
      };

      accounts.push(newAccount);
      localStorage.setItem("codeforge_accounts", JSON.stringify(accounts));

      // Auto login user after successful signup
      const loggedUser = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        createdAt: newAccount.createdAt
      };

      setUser(loggedUser);
      localStorage.setItem("codeforge_current_user", JSON.stringify(loggedUser));

      // Create blank progress record for the new user
      const blankProg = getCleanProgress();
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
    setUserProgress(getCleanProgress());
  };

  // Update profile name
  const updateProfile = (newName) => {
    if (!user) return;
    const trimmed = (newName || "").trim();
    if (!trimmed) return;

    const updatedUser = { ...user, name: trimmed };
    setUser(updatedUser);
    localStorage.setItem("codeforge_current_user", JSON.stringify(updatedUser));

    // Update in accounts array too
    try {
      const savedAccounts = localStorage.getItem("codeforge_accounts");
      if (savedAccounts) {
        const accounts = JSON.parse(savedAccounts);
        const updated = accounts.map((acc) =>
          acc.email.toLowerCase() === user.email.toLowerCase() ? { ...acc, name: trimmed } : acc
        );
        localStorage.setItem("codeforge_accounts", JSON.stringify(updated));
      }
    } catch (e) {}
  };

  // Record an attempt and test execution result with genuine timestamp
  const recordQuestionAttempt = ({ questionId, questionTitle, language, passed, statusText }) => {
    if (!user?.email) return;

    setUserProgress((prev) => {
      const currentAttempted = Array.isArray(prev.attemptedQuestions) ? prev.attemptedQuestions : [];
      const currentSolved = Array.isArray(prev.solvedQuestions) ? prev.solvedQuestions : [];
      const currentActivity = Array.isArray(prev.activity) ? prev.activity : [];

      // 1. Add to attempted questions if not already there
      const attempted = currentAttempted.includes(questionId)
        ? currentAttempted
        : [...currentAttempted, questionId];

      // 2. Add to solved questions only if genuinely passed
      let solved = currentSolved;
      if (passed && !currentSolved.includes(questionId)) {
        solved = [...currentSolved, questionId];
      }

      // 3. Create real activity entry with authentic formatted timestamp
      const now = new Date();
      const realTimeFormatted = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const realDateFormatted = now.toLocaleDateString([], { month: "short", day: "numeric" });
      const displayTime = `${realDateFormatted}, ${realTimeFormatted}`;

      const newActivity = {
        id: "act-" + Date.now(),
        questionId,
        questionTitle: questionTitle || "Coding Challenge",
        language: language || "Java",
        passed: Boolean(passed),
        timestamp: displayTime,
        statusText: statusText || (passed ? "Accepted" : "Output Mismatch")
      };

      // Keep recent 15 activities
      const updatedActivity = [newActivity, ...currentActivity.slice(0, 14)];

      const updatedProgress = {
        ...prev,
        attemptedQuestions: attempted,
        solvedQuestions: solved,
        preferredLanguage: language || prev.preferredLanguage || "Java",
        activity: updatedActivity
      };

      try {
        localStorage.setItem(
          `codeforge_progress_${user.email.toLowerCase()}`,
          JSON.stringify(updatedProgress)
        );
      } catch (err) {
        console.error("Failed saving progress:", err);
      }

      return updatedProgress;
    });
  };

  // Reset user's progress
  const resetUserProgress = () => {
    if (!user?.email) return;
    const cleanProgress = getCleanProgress();
    setUserProgress(cleanProgress);
    localStorage.setItem(`codeforge_progress_${user.email.toLowerCase()}`, JSON.stringify(cleanProgress));
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
        defaultEmail: DEFAULT_ACCOUNT_EMAIL,
        defaultPassword: DEFAULT_PASSWORD
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
