import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '@/features/projects/projectsSlice';
import servicesReducer from '@/features/services/servicesSlice';
import clientsReducer from '@/features/clients/clientsSlice';
import featuresReducer from '@/features/features/featuresSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    services: servicesReducer,
    clients: clientsReducer,
    features: featuresReducer,
  },
});
