import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import referralService from "../../services/referralService";
import { toast } from "react-toastify";

// Fetch referrals async
export const fetchReferrals = createAsyncThunk(
  "referral/fetchReferrals",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const role = state.auth.user?.role;
      const response = await referralService.getReferrals(role);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        const errorMessage = response.data.message || "Fetch failed";
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Fetch failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add referral async
export const addReferral = createAsyncThunk(
  "referral/addReferral",
  async (data, thunkAPI) => {
    try {
      const response = await referralService.createReferral(data);
      
      if (response.data.success) {
        toast.success("Referral Created");
        return response.data.data;
      } else {
        const errorMessage = response.data.message || "Create failed";
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Create failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update referral async
export const updateReferral = createAsyncThunk(
  "referral/updateReferral",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await referralService.updateReferral(id, data);
      
      if (response.data.success) {
        toast.success("Referral Updated");
        return response.data.data;
      } else {
        const errorMessage = response.data.message || "Update failed";
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update with resume async
export const updateReferralWithResume = createAsyncThunk(
  "referral/updateReferralWithResume",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await referralService.updateReferralWithResume(id, data);
      
      if (response.data.success) {
        toast.success("Referral Updated");
        return response.data.data;
      } else {
        const errorMessage = response.data.message || "Update failed";
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete referral async
export const deleteReferral = createAsyncThunk(
  "referral/deleteReferral",
  async (id, thunkAPI) => {
    try {
      const response = await referralService.deleteReferral(id);
      
      if (response.data.success) {
        toast.success("Referral Deleted");
        return id;
      } else {
        const errorMessage = response.data.message || "Delete failed";
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Delete failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const referralSlice = createSlice({
  name: "referral",
  initialState: { 
    referrals: [], 
    loading: false,
    error: null 
  },
  reducers: {
    clearReferralError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch referrals cases
      .addCase(fetchReferrals.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.referrals = action.payload || [];
      })
      .addCase(fetchReferrals.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
      })
      // Add referral case
      .addCase(addReferral.fulfilled, (state, action) => {
        state.referrals.push(action.payload);
      })
      // Update referral case
      .addCase(updateReferral.fulfilled, (state, action) => {
        const index = state.referrals.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.referrals[index] = action.payload;
        }
      })
      // Update with resume case
      .addCase(updateReferralWithResume.fulfilled, (state, action) => {
        const index = state.referrals.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.referrals[index] = action.payload;
        }
      })
      // Delete referral case
      .addCase(deleteReferral.fulfilled, (state, action) => {
        state.referrals = state.referrals.filter(r => r._id !== action.payload);
      });
  }
});

export const { clearReferralError } = referralSlice.actions;
export default referralSlice.reducer;