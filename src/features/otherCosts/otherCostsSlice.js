import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const fetchOtherCosts = createAsyncThunk(
  'otherCosts/fetchOtherCosts',
  async (userId, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/otherCosts`));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOtherCost = createAsyncThunk(
  'otherCosts/addOtherCost',
  async ({ userId, cost }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/otherCosts`), cost);
      return { id: docRef.id, ...cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOtherCost = createAsyncThunk(
  'otherCosts/updateOtherCost',
  async ({ userId, costId, cost }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, `users/${userId}/otherCosts/${costId}`), cost);
      return { id: costId, ...cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOtherCost = createAsyncThunk(
  'otherCosts/deleteOtherCost',
  async ({ userId, costId }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/otherCosts/${costId}`));
      return costId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: {
    costs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherCosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.costs = action.payload;
      })
      .addCase(fetchOtherCosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.costs.push(action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const index = state.costs.findIndex(cost => cost.id === action.payload.id);
        if (index !== -1) {
          state.costs[index] = action.payload;
        }
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.costs = state.costs.filter(cost => cost.id !== action.payload);
      });
  },
});

export default otherCostsSlice.reducer;