import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      
      if (result) {
        toast.success("Login successful!");
        
        // Check role and redirect
        if (result.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled in the slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.loginButton,
              ...(loading ? styles.loadingButton : {})
            }}
          >
            {loading ? (
              <div style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Logging in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span 
              style={styles.link}
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  loginCard: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #e0e0e0",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
    margin: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "all 0.3s ease",
    outline: "none",
  },
  loginButton: {
    padding: "14px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  loadingButton: {
    backgroundColor: "#a0a0a0",
    cursor: "not-allowed",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid transparent",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    marginTop: "25px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  footerText: {
    color: "#666",
    fontSize: "14px",
    margin: "0",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "500",
    textDecoration: "underline",
  },
};

// Add hover effects and focus states
Object.assign(styles.input, {
  ":focus": {
    borderColor: "#667eea",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
  },
  ":hover": {
    borderColor: "#999",
  },
});

Object.assign(styles.loginButton, {
  ":hover": {
    backgroundColor: "#5a6fd8",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  ":disabled:hover": {
    backgroundColor: "#a0a0a0",
    transform: "none",
    boxShadow: "none",
  },
});

Object.assign(styles.link, {
  ":hover": {
    color: "#5a6fd8",
  },
});

// Add keyframes for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default LoginPage;