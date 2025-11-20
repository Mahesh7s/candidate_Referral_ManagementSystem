import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import CandidateCard from "../../components/CandidateCard";
import ReferralForm from "../../components/ReferralForm";
import SearchBar from "../../components/SearchBar";
import { fetchReferrals } from "../../redux/slices/referralSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { referrals, loading } = useSelector(state => state.referral);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingReferral, setEditingReferral] = useState(null);

  useEffect(() => { 
    dispatch(fetchReferrals()); 
  }, [dispatch]);

  const filtered = referrals.filter(r => 
    r.jobTitle.toLowerCase().includes(search.toLowerCase()) || 
    r.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddReferral = () => {
    setEditingReferral(null);
    setShowForm(true);
  };

  const handleEditReferral = (referral) => {
    setEditingReferral(referral);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingReferral(null);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Loading referrals...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.dashboardHeader}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage all candidate referrals</p>
        </div>
        <button
          onClick={handleAddReferral}
          style={styles.addButton}
        >
          <span style={styles.addIcon}>+</span>
          Add New Referral
        </button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{referrals.length}</div>
          <div style={styles.statLabel}>Total Referrals</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>
            {referrals.filter(r => r.status === "Pending").length}
          </div>
          <div style={styles.statLabel}>Pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>
            {referrals.filter(r => r.status === "Reviewed").length}
          </div>
          <div style={styles.statLabel}>Reviewed</div>
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      
      <div style={styles.resultsHeader}>
        <h3 style={styles.resultsTitle}>
          All Referrals <span style={styles.resultsCount}>({filtered.length})</span>
        </h3>
        {search && (
          <div style={styles.searchResults}>
            Showing results for: "<strong>{search}</strong>"
          </div>
        )}
      </div>
      
      {filtered.length === 0 && !loading ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📋</div>
          <h3 style={styles.emptyTitle}>
            {search ? "No matching referrals found" : "No referrals found"}
          </h3>
          <p style={styles.emptyText}>
            {search 
              ? "Try adjusting your search terms or browse all referrals"
              : "Get started by adding the first referral to the system"
            }
          </p>
          <button
            onClick={handleAddReferral}
            style={styles.emptyButton}
          >
            {search ? "View All Referrals" : "Add First Referral"}
          </button>
          {search && (
            <button
              onClick={() => setSearch("")}
              style={styles.secondaryButton}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div style={styles.cardsGrid}>
          {filtered.map(r => (
            <CandidateCard 
              key={r._id} 
              referral={r} 
              onEdit={handleEditReferral}
            />
          ))}
        </div>
      )}

      {/* Referral Form Modal */}
      <ReferralForm 
        isOpen={showForm}
        onClose={handleCloseForm}
        editData={editingReferral}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: "0 20px 40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  loadingContainer: {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  loadingContent: {
    textAlign: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e3e3e3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px auto",
  },
  loadingText: {
    fontSize: "16px",
    color: "#7f8c8d",
    fontWeight: "500",
  },
  dashboardHeader: {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },
  headerLeft: {
    flex: "1",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#2c3e50",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  subtitle: {
    margin: "0",
    color: "#7f8c8d",
    fontSize: "1.1rem",
    fontWeight: "400",
  },
  addButton: {
    padding: "14px 28px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.2)",
  },
  addIcon: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "white",
    padding: "25px 20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "1px solid #e0e0e0",
    transition: "all 0.3s ease",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "14px",
    color: "#7f8c8d",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  resultsHeader: {
    marginBottom: "25px",
  },
  resultsTitle: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  resultsCount: {
    color: "#3498db",
    fontWeight: "700",
  },
  searchResults: {
    color: "#7f8c8d",
    fontSize: "14px",
  },
  emptyState: {
    textAlign: "center", 
    padding: "60px 20px", 
    backgroundColor: "white",
    borderRadius: "12px",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    color: "#2c3e50",
    margin: "0 0 12px 0",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: "1rem",
    color: "#7f8c8d",
    margin: "0 0 30px 0",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.5",
  },
  emptyButton: {
    padding: "14px 32px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    marginRight: "10px",
  },
  secondaryButton: {
    padding: "14px 32px",
    backgroundColor: "transparent",
    color: "#7f8c8d",
    border: "1px solid #bdc3c7",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "25px",
  },
};

// Add hover effects
Object.assign(styles.addButton, {
  ":hover": {
    backgroundColor: "#219653",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(39, 174, 96, 0.3)",
  },
});

Object.assign(styles.statCard, {
  ":hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  },
});

Object.assign(styles.emptyButton, {
  ":hover": {
    backgroundColor: "#2980b9",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.secondaryButton, {
  ":hover": {
    backgroundColor: "#f8f9fa",
    borderColor: "#95a5a6",
  },
});

// Add CSS animation for spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default AdminDashboard;