import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      
      if (result) {
        toast.success("🎉 Registration successful! Please login.");
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      // Error is handled in the slice
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerCard}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join our referral platform</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              style={styles.input}
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.registerButton,
              ...(loading ? styles.loadingButton : {})
            }}
          >
            {loading ? (
              <div style={styles.buttonContent}>
                <div style={styles.spinner}></div>
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <span 
              style={styles.link}
              onClick={() => navigate("/login")}
            >
              Sign in
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
  registerCard: {
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
  registerButton: {
    padding: "14px",
    backgroundColor: "#28a745",
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
  helpNote: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#fff3cd",
    borderRadius: "6px",
    border: "1px solid #ffeaa7",
  },
  helpText: {
    margin: "0",
    fontSize: "12px",
    color: "#856404",
    lineHeight: "1.4",
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

Object.assign(styles.registerButton, {
  ":hover": {
    backgroundColor: "#218838",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
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

export default RegisterPage;