import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../services/UserService';
const initialState = {
    user: null,
    loading: true,
    error: null,
}
export const fetchUser = createAsyncThunk(
    'auth/fetch_user',
    async () => {
        try {
            const data = await getCurrentUser()
            return data.data
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.message;
        });
    },
});

export const { removeUser, updateUser } = authSlice.actions;
export default authSlice.reducer;