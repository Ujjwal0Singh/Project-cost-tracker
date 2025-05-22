import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/items`));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, `users/${userId}/items`), {
        name: item.name,
        cost: item.cost,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...item };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ userId, itemId, item }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, `users/${userId}/items/${itemId}`), item);
      return { id: itemId, ...item };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, `users/${userId}/items/${itemId}`));
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;