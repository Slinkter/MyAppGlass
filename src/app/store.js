import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import servicesReducer from '../features/services/servicesSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    services: servicesReducer,
  },
});
