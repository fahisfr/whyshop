import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'



export const fetchProduts = createAsyncThunk('product/fetchproduct', async () => {
    const response = await Axios.get('/product').then(res => res.data)
    return response
})
export const ProdutsSlice = createSlice({
    name: 'produts',
    initialState: {
        products: [],
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