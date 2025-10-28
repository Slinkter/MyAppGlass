import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para obtener los servicios
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch data from local JSON file
      const response = await fetch('/services.json');
      if (!response.ok) {
        throw new Error('Failed to fetch local services data');
      }
      const services = await response.json();
      return services;
    } catch (error) {
      console.error("Failed to fetch local services:", error);
      return rejectWithValue(error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
