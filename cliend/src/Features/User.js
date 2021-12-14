import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'


export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await Axios.get(`/authentication'`).then(res=>res.data)
    return response
})

export const  userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            name: '',
            number: '',
            isAuth: false,
        },
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
        }
    }, extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.userInfo = action.payload;
            
        }
    }
})

export const {login} = userSlice.actions;

export default userSlice.reducer;