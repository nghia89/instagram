import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUserAuth } from "../../api/userApi"
import { IUser } from "../../models/users"


const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUserAuth.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        })
        builder.addCase(fetchUserAuth.rejected, state => {
            state.loading = false
        })
    }
})

export default usersSlice.reducer

export const fetchUserAuth = createAsyncThunk('users/fetchUserAuth', async () => {
    const response = await getUserAuth();
    return response;
});