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
        loading: true,

    },
    reducers: {
        SetProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: {
        [fetchProduts.pending]: (state, action) => {
            state.loading = true
        }
        ,
        [fetchProduts.fulfilled]: (state, action) => {
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
export const { SetProducts } = ProdutsSlice.actions
export default ProdutsSlice.reducer;