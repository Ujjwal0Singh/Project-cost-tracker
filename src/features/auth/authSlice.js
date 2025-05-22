import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;