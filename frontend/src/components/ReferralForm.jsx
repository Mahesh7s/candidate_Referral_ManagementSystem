import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReferral, updateReferral, updateReferralWithResume } from "../redux/slices/referralSlice";

const ReferralForm = ({ isOpen, onClose, editData = null }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({ 
    candidateName: "", 
    email: "", 
    phone: "", 
    jobTitle: "", 
    resume: null,
    status: "Pending"
  });
  const [loading, setLoading] = useState(false);

  // Set form data when editing
  useEffect(() => {
    if (editData) {
      console.log("📝 Setting edit data:", editData);
      setFormData({
        candidateName: editData.candidateName || "",
        email: editData.email || "",
        phone: editData.phone || "",
        jobTitle: editData.jobTitle || "",
        status: editData.status || "Pending",
        resume: null // Don't pre-fill resume for editing
      });
    } else {
      // Reset form for new referral
      setFormData({ 
        candidateName: "", 
        email: "", 
        phone: "", 
        jobTitle: "", 
        resume: null,
        status: "Pending"
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editData && !formData.resume) {
      alert("Please select a resume file");
      return;
    }

    setLoading(true);
    try {
      if (editData) {
        // Update existing referral
        const updatePayload = {
          candidateName: formData.candidateName,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle
        };
        
        // Only include status if user is admin
        if (user.role === "Admin") {
          updatePayload.status = formData.status;
        }

        console.log("📤 Sending update payload:", updatePayload);

        // Use appropriate update method based on whether resume is provided
        if (formData.resume) {
          await dispatch(updateReferralWithResume({ 
            id: editData._id, 
            data: { ...updatePayload, resume: formData.resume }
          })).unwrap();
        } else {
          await dispatch(updateReferral({ 
            id: editData._id, 
            data: updatePayload 
          })).unwrap();
        }
      } else {
        // Create new referral
        await dispatch(addReferral(formData)).unwrap();
      }
      
      // Reset form and close modal
      setFormData({ 
        candidateName: "", 
        email: "", 
        phone: "", 
        jobTitle: "", 
        resume: null,
        status: "Pending"
      });
      if (document.getElementById("resume-input")) {
        document.getElementById("resume-input").value = "";
      }
      onClose();
    } catch (error) {
      console.error("Failed to save referral:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "90vh",
        overflow: "auto"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px"
        }}>
          <h3>{editData ? "Edit Referral" : "Add New Referral"}</h3>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#666"
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Candidate Name *
            </label>
            <input
              name="candidateName"
              placeholder="Enter candidate name"
              value={formData.candidateName}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Email *
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter candidate email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Phone *
            </label>
            <input
              name="phone"
              placeholder="Enter candidate phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Job Title *
            </label>
            <input
              name="jobTitle"
              placeholder="Enter job title"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          {/* Status field - Only for Admin and when editing */}
          {user.role === "Admin" && editData && (
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>
            </div>
          )}

          {/* Resume field - Required for new referrals, optional for edits */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Resume (PDF) {!editData ? "*" : ""}
            </label>
            <input
              id="resume-input"
              name="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required={!editData} // Only required for new referrals
              style={{ width: "100%", padding: "8px" }}
            />
            <small style={{ color: "#666" }}>
              {editData ? "Upload new resume to replace existing one (optional)" : "Only PDF files are accepted"}
            </small>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: loading ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Saving..." : editData ? "Update Referral" : "Add Referral"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;