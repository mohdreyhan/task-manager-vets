import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import taskReducer from '../store/taskSlice';
import usesReducer from '../store/userSlice';
import organizationReducer from '../store/organizationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    users: usesReducer,
    organizations: organizationReducer,
  },
});
