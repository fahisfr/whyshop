import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchAllOrder = createAsyncThunk('AllOrder/fetchCart', async () => {
    const response = await Axios.get('/admin/orders').then(res => res.data)
    return response
})
export const AllOrderSlice = createSlice({
    name: 'order',
    initialState: {
        OrdersInfo: [],
    },
    reducers: {
        addToCart: (state, action) => {
        }
    },
    extraReducers: {
        [fetchAllOrder.fulfilled]: (state, action) => {
            state.OrdersInfo = action.payload.Orders
        }
    }
})
export default AllOrderSlice.reducer;