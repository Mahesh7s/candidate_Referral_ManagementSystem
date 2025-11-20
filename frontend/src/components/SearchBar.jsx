import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div style={styles.container}>
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          placeholder="Search by Job Title or Status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
        />
        {search && (
          <button 
            onClick={() => setSearch("")} 
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "30px",
  },
  searchWrapper: {
    position: "relative",
    maxWidth: "500px",
    margin: "0 auto",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    color: "#7f8c8d",
  },
  input: {
    width: "100%",
    padding: "14px 45px 14px 45px",
    borderRadius: "25px",
    border: "2px solid #e0e0e0",
    fontSize: "16px",
    backgroundColor: "#f8f9fa",
    transition: "all 0.3s ease",
    outline: "none",
  },
  clearButton: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#7f8c8d",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

// Add focus and hover effects
Object.assign(styles.input, {
  ":focus": {
    borderColor: "#3498db",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.1)",
  },
});

Object.assign(styles.clearButton, {
  ":hover": {
    backgroundColor: "#e0e0e0",
  },
});

export default SearchBar;