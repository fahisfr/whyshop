import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const response = await Axios.get('/cart').then(res => res.data)
    return response
}
)
export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartInfo: [],
        loading: false,
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartInfo.push(action.payload)
        }
    },
    extraReducers: {
        [fetchCart.pending]: (state, action) => {
            state.loading = true
        }
        ,
        [fetchCart.fulfilled]: (state, action) => {
            state.cartInfo = action.payload
            state.loading = false
        }
        ,
        [fetchCart.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        }
    }
})
export default CartSlice.reducer;