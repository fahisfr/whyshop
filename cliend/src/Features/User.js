import { createSlice } from '@reduxjs/toolkit'



// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         user: { wins: 0, losses: 0, ties: 0 },
//         isLoggedIn: false,
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         login: (state, action) => {
//             state.isLoggedIn = true;
//             state.user = action.payload;
//         }
//     }
// });

export const  userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: 'fahis',
            number: null,
        },
        isloggdIn:false,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        }
    },
})

export default userSlice.reducer;