import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReferral } from "../redux/slices/referralSlice";

const CandidateCard = ({ referral, onEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user.role === "Admin";
  const isCreator = referral.createdBy._id === user._id;
  const canEdit = isAdmin || isCreator;
  const canDelete = isCreator;

  // ------------------------
  // DELETE REFERRAL
  // ------------------------
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this referral?")) {
      dispatch(deleteReferral(referral._id));
    }
  };

  // ------------------------
  // VIEW RESUME
 const handleViewResume = () => {
    if (!referral.resumeUrl) {
      alert("No resume available");
      return;
    }

    // Use Vite environment variable for resume URL
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const resumeEndpoint = `${API_BASE_URL}/referral/${referral._id}/resume`;
    console.log("Opening resume:", resumeEndpoint);
    window.open(resumeEndpoint, "_blank");
  };

  // ------------------------
  // EDIT BUTTON CLICK
  // ------------------------
  const handleEdit = () => {
    onEdit(referral);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      Pending: { bg: "#fff3e0", text: "#ff9800", border: "#ffb74d" },
      Reviewed: { bg: "#e3f2fd", text: "#1976d2", border: "#90caf9" },
      Selected: { bg: "#e8f5e8", text: "#2e7d32", border: "#81c784" },
      Rejected: { bg: "#ffebee", text: "#c62828", border: "#ef5350" },
    };
    return statusColors[status] || statusColors.Pending;
  };

  const statusColor = getStatusColor(referral.status);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h4 style={styles.candidateName}>{referral.candidateName}</h4>
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: statusColor.bg,
            color: statusColor.text,
            border: `1px solid ${statusColor.border}`,
          }}
        >
          {referral.status}
        </span>
      </div>

      <div style={styles.details}>
        <div style={styles.detailRow}>
          <span style={styles.label}>📧 Email:</span>
          <span style={styles.value}>{referral.email}</span>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.label}>📞 Phone:</span>
          <span style={styles.value}>{referral.phone}</span>
        </div>

        <div style={styles.detailRow}>
          <span style={styles.label}>💼 Job Title:</span>
          <span style={styles.value}>{referral.jobTitle}</span>
        </div>

        {isAdmin && (
          <div style={styles.detailRow}>
            <span style={styles.label}>👤 Referred by:</span>
            <span style={styles.value}>
              {referral.createdBy?.name || "Unknown"}
            </span>
          </div>
        )}

        {/* Current Status Display - Always Visible */}
        <div style={styles.detailRow}>
          <span style={styles.label}>📊 Status:</span>
          <span 
            style={{
              ...styles.statusText,
              color: statusColor.text,
              fontWeight: '600'
            }}
          >
            {referral.status}
          </span>
        </div>
      </div>

      {referral.resumeUrl && (
        <div style={styles.resumeSection}>
          <button onClick={handleViewResume} style={styles.resumeButton}>
            📄 View Resume
          </button>
        </div>
      )}

      <div style={styles.actions}>
        {canEdit && (
          <button
            onClick={handleEdit}
            style={isAdmin && !isCreator ? styles.adminEditButton : styles.editButton}
          >
            {isAdmin && !isCreator ? "🔄 Update Status" : "✏️ Edit"}
          </button>
        )}

        {canDelete && (
          <button onClick={handleDelete} style={styles.deleteButton}>
            🗑️ Delete
          </button>
        )}
      </div>

    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e0e0e0",
    margin: "15px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    maxWidth: "400px",
    minWidth: "300px",
    flex: "1 1 300px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },
  candidateName: {
    margin: "0",
    color: "#2c3e50",
    fontSize: "1.3rem",
    fontWeight: "600",
    flex: "1",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap",
  },
  statusText: {
    fontSize: "0.95rem",
    padding: "2px 8px",
    borderRadius: "4px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "15px",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "600",
    color: "#555",
    fontSize: "0.9rem",
    minWidth: "80px",
  },
  value: {
    color: "#333",
    fontSize: "0.95rem",
    wordBreak: "break-word",
  },
  resumeSection: {
    margin: "15px 0",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px dashed #dee2e6",
  },
  resumeButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.95rem",
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
    flexWrap: "wrap",
  },
  editButton: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    flex: "1",
  },
  adminEditButton: {
    padding: "8px 16px",
    backgroundColor: "#ffc107",
    color: "#212529",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    flex: "1",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    flex: "1",
  },
  adminNote: {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "#fff3cd",
    borderRadius: "4px",
    border: "1px solid #ffeaa7",
  },
};

// Add hover effects
Object.assign(styles.card, {
  ":hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
});

Object.assign(styles.resumeButton, {
  ":hover": {
    backgroundColor: "#007bff",
    color: "white",
  },
});

Object.assign(styles.editButton, {
  ":hover": {
    backgroundColor: "#218838",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.adminEditButton, {
  ":hover": {
    backgroundColor: "#e0a800",
    transform: "translateY(-1px)",
  },
});

Object.assign(styles.deleteButton, {
  ":hover": {
    backgroundColor: "#c82333",
    transform: "translateY(-1px)",
  },
});

export default CandidateCard;