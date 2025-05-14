import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../app/axiosInstance';
import { fetchUser } from './userSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { access_token, user_id } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user_id', user_id);

      dispatch(fetchUser(user_id));

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const signupUser = createAsyncThunk('auth/signupUser', async (data) => {
  const response = await axiosInstance.post('/users', data);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token } = action.payload;
        state.token = access_token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
