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
        error: '',
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload)
            state.cartInfo.push(action.payload)
        },
        changeProductQuantity: (state, action) => {
            action.payload.quantity === .5 ? state.total += action.payload.price : state.total -= action.payload.price
            state.cartInfo.find(itme => itme._id === action.payload.id).quantity += action.payload.quantity
        },
        removeFromCart: (state, action) => {
            state.cartInfo = state.cartInfo.filter(item => item._id !== action.payload)
        },
        removeAllProducts: (state, action) => {
            state.cartInfo = []
        },
        Checkout: (state, action) => {
            state.cartInfo = []
        }
    },
    extraReducers: {
        [fetchCart.pending]: (state, action) => {
            state.loading = true
        }
        ,
        [fetchCart.fulfilled]: (state, action) => {
            state.cartInfo = action.payload.cart
            state.total = action.payload.totalamout
            state.totle = action.payload.totleamout
            state.loading = false
        }
        ,
        [fetchCart.rejected]: (state, action) => {
            state.error = action.error
            state.loading = false
        }
    }
})
export const { addToCart, changeProductQuantity, removeFromCart, removeAllProducts,Checkout } = CartSlice.actions;
export default CartSlice.reducer;