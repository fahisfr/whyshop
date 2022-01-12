import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchProduts = createAsyncThunk('cart/fetchCart', async () => {
    const response = await Axios.get('/cart').then(res => res.data)
    return response
}
)
export const ProdutsSlice = createSlice({
    name: 'produts',
    initialState: {
        cartInfo: [],
        error: null,
        loading: false,

    },
    extraReducers: {
        [fetchProduts.pending]: (state, action) => {
            state.loading = true
        }
        ,
        [fetchProduts.fulfilled]: (state, action) => {
            state.cartInfo = action.payload.cart
            state.totle = action.payload.totleamout
            state.status = action.payload.status
            state.loading = false
        }
        ,
        [fetchProduts.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        }
    }
})
export default ProdutsSlice.reducer;