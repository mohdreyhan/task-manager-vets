import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../app/axiosInstance';

const API_URL = '/organizations';

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchAll',
  async () => {
    const response = await axiosInstance.get(API_URL);
    console.log("res", response)
    return response.data;
  }
);

export const createOrganization = createAsyncThunk(
  'organizations/create',
  async (data) => {
    const response = await axiosInstance.post(API_URL, data);
    return response.data;
  }
);

export const updateOrganization = createAsyncThunk(
  'organizations/update',
  async ({ id, ...data }) => {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, data);
    return response.data;
  }
);

export const deleteOrganization = createAsyncThunk(
  'organizations/delete',
  async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
    return id;
  }
);

const organizationSlice = createSlice({
  name: 'organizations',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createOrganization.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateOrganization.fulfilled, (state, action) => {
        const index = state.list.findIndex((org) => org.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.list = state.list.filter((org) => org.id !== action.payload);
      });
  },
});

export default organizationSlice.reducer;
