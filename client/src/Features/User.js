import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'


export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await Axios.get('/auth').then(res=>res.data)
    return response
})
export const  userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            name: '',
            number: '',
            role: '',
            isAuth: false,
        },
        error: '',
        loading: false,
    },
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;

        },
        logout: (state, action) => {
            state.userInfo = {
                name: '',
                number: '',
                role: '',
                isAuth: false,
            }
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

export const {login,logout} = userSlice.actions;

export default userSlice.reducer;