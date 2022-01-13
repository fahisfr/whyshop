import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'


export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await Axios.get('/authentication').then(res=>res.data)
    return response
})

export const  userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            name: '',
            number: '',
        },
        error: '',
        loading: false,
        isAthu:false,
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;

        }
    }, extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.userInfo = action.payload.UserInfo;
        },
        [fetchUser.pending]: (state, action) => {
            state.loading= true;
            
        },
        [fetchUser.rejected]: (state, action) => {
            state.error = action.error;
            state.loading = false;
        }
    }
})

export const {login} = userSlice.actions;

export default userSlice.reducer;