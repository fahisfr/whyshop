import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchOrder = createAsyncThunk('Order/fetchCart', async () => {
    const response = await Axios.get('/order').then(res => res.data)
    return response
})
export const OrderSlice = createSlice({
    name: 'order',
    initialState: {
        OrderInfo: [],
    },
    reducers: {
        addToCart: (state, action) => {
        }
    },
    extraReducers: {
        [fetchOrder.fulfilled]: (state, action) => {
            state.OrderInfo = action.payload.order
            

        }
    }
})
export default OrderSlice.reducer;