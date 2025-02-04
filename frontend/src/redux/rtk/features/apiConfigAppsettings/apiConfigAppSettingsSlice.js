import { errorHandler, successHandler } from "@/utils/functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apiConfig: null,
  error: "",
  loading: false,
};

// Load API Config Thunk
export const loadApiConfig = createAsyncThunk(
  "apiConfig/loadApiConfig",
  async () => {
    try {
      const { data } = await axios.get("api-config/1");
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// Update API Config Thunk
export const updateApiConfig = createAsyncThunk(
  "apiConfig/updateApiConfig",
  async (values) => {
    try {
      const { data } = await axios({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `api-config`,
        data: values,
      });
      return successHandler(data, "API Key Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// Create the Slice
const apiConfigSlice = createSlice({
  name: "apiConfig",
  initialState,
  reducers: {
    clearApiConfig: (state) => {
      state.apiConfig = null;
    },
  },
  extraReducers: (builder) => {
    // Load API config builders
    builder.addCase(loadApiConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadApiConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.apiConfig = action.payload?.data;
    });

    builder.addCase(loadApiConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to load API Config";
    });

    // Update API config builders
    builder.addCase(updateApiConfig.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateApiConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.apiConfig = action.payload?.data;
    });

    builder.addCase(updateApiConfig.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "Failed to update API Config";
    });
  },
});

export default apiConfigSlice.reducer;
export const { clearApiConfig } = apiConfigSlice.actions;
