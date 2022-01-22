import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchProduts = createAsyncThunk('product/fetchproduct', async () => {
    const response = await Axios.get('/product').then(res => res.data)
    return response
})
export const ProdutsSlice = createSlice({
    name: 'produts',
    initialState: {
        products: [{
            availiabel: true,
            createdAt: "2022-01-04T18:11:47.340Z",
            imageId: "apple1641320065790",
            name: "Apple",
            price: 90,
            quantity: 130,
            type: "fruits",
        }],
        error: null,
        loading: false,

    },
    extraReducers: {
        [fetchProduts.pending]: (state, action) => {
            state.loading = true
        }
        ,
        [fetchProduts.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.products = action.payload.products
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