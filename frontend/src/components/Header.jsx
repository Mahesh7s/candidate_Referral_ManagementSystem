import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>Welcome, {user?.name || "User"}</div>
            <div style={styles.userRole}>{user?.role || "Admin"}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <span style={styles.logoutIcon}>🚪</span>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "16px 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "2px",
  },
  userRole: {
    fontSize: "12px",
    color: "#bdc3c7",
    textTransform: "capitalize",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid #e74c3c",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
};

// Add hover effects
Object.assign(styles.logoutButton, {
  ":hover": {
    backgroundColor: "#e74c3c",
    transform: "translateY(-1px)",
  },
});

export default Header;