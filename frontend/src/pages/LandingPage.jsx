import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Candidate Referral Management</h1>
        <p style={styles.subtitle}>
          Streamline your employee referral process and hire better candidates faster. 
          Our platform makes it easy to manage referrals and track candidates.
        </p>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.primaryButton} 
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button 
            style={styles.secondaryButton} 
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3>Submit Referrals</h3>
            <p>
              Easily refer candidates by submitting their details through our simple form. 
              Upload resumes and provide necessary information in just a few clicks.
            </p>
          </div>
          
          <div style={styles.card}>
            <h3>Track Status</h3>
            <p>
              Monitor your referrals throughout the hiring process. Get real-time 
              updates on application status and next steps.
            </p>
          </div>
          
          
        </div>
      </div>

      {/* Additional Info */}
      <div style={styles.infoSection}>
        <h2 style={styles.sectionTitle}>Why Use Our Platform?</h2>
        <p style={styles.paragraph}>
          Our referral management system helps companies tap into their employees' networks 
          to find qualified candidates. With an intuitive interface and streamlined process, 
          you can reduce hiring time and improve candidate quality.
        </p>
        <p style={styles.paragraph}>
          Employees enjoy a simple way to refer their connections while tracking their 
          referrals and earning rewards for successful placements.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    maxWidth: "600px",
    margin: "0 auto 2rem",
    lineHeight: "1.6",
    opacity: 0.9,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "12px 30px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  secondaryButton: {
    padding: "12px 30px",
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  features: {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "3rem",
    color: "#333",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  infoSection: {
    padding: "60px 20px",
    backgroundColor: "white",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    marginBottom: "1.5rem",
    color: "#555",
  },
};

// Add hover effects
styles.primaryButton = {
  ...styles.primaryButton,
  ":hover": {
    backgroundColor: "#45a049",
  },
};

styles.secondaryButton = {
  ...styles.secondaryButton,
  ":hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
};

export default LandingPage;