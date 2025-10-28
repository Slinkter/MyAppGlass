import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllProjects } from '@/api/projectService';

/**
 * @description Thunk asíncrono para obtener los datos de los proyectos.
 * Utiliza el servicio `projectService` para abstraer la lógica de fetching.
 * Maneja los estados de pending, fulfilled y rejected para la operación.
 */
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const projects = await fetchAllProjects();
      return projects;
    } catch (error) {
      // El servicio ya loguea el error, aquí solo lo pasamos a Redux.
      return rejectWithValue(error.message);
    }
  }
);

/**
 * @description Slice de Redux para gestionar el estado de los proyectos.
 * Incluye el estado de los items, el estado de la carga (status) y los errores.
 */
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default projectsSlice.reducer;
