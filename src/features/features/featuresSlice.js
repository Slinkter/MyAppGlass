import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk para obtener las características
export const fetchFeatures = createAsyncThunk(
  'features/fetchFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/features.json');
      if (!response.ok) {
        throw new Error('Error al obtener las características');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const featuresSlice = createSlice({
  name: 'features',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default featuresSlice.reducer;
