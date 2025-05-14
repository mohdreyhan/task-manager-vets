import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../app/axiosInstance';

// 🔁 Fetch Tasks (filtered by role/org in backend)
export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const response = await axiosInstance.get('/tasks');  // Add await here
  return response.data;
});

// ➕ Create Task
export const createTask = createAsyncThunk('tasks/create', async (data) => {
  const response = await axiosInstance.post('/tasks', data); // Use POST instead of GET
  return response.data;
});

// ✏️ Update Task
export const updateTask = createAsyncThunk('tasks/update', async ({ id, ...data }) => {
  const response = await axiosInstance.patch(`/tasks/${id}`, data);
  return response.data;
});

// ❌ Delete Task
export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
